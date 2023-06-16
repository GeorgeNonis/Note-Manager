import { NoteProps } from "./interfaces";
import {
  Options,
  ReviewModal,
  Title,
  NoteDetails,
  NoteWrapper,
  LoadingSpinner,
} from "../../../../index";
import { useArchivedNote } from "./useArchivedNote";
import { Transition } from "react-transition-group";
import styles from "../../../../notes/note.module.scss";
import LoadingSpinnerAction from "../../../../ui/loading-spinner-action";

const Note = ({ note, position, zindex }: NoteProps) => {
  const { state } = useArchivedNote({ note, zindex });
  return (
    <>
      <Transition
        in={state.values.review}
        timeout={500}
        mountOnEnter
        unmountOnExit
      >
        {(transState) => (
          <ReviewModal
            setReview={state.actions.setReview}
            transitionState={transState}
          />
        )}
      </Transition>
      <NoteWrapper
        dragable={false}
        zIndex={state.values.zIndex}
        position={position}
        pinned={false}
        review={state.values.review}
        setReview={state.actions.setReview}
        note={note}
        onDragEnd={() => {}}
        onDragEnter={() => {}}
        onDragStart={() => {}}
      >
        <Title
          editable={false}
          title={state.values.noteTitle}
          setNoteTitle={state.actions.setNoteTitle}
        />
        <NoteDetails
          archived={true}
          editable={false}
          setNotedetails={state.actions.setNotedetails}
          pinned={false}
          note={note}
          noteValue={state.values.noteValue}
          checkbox={note.checkbox}
        />
        {state.values.review && (
          <div className={styles.actions}>
            <button
              disabled={state.values.disableBtn}
              className={
                state.values.disableBtn
                  ? styles.reviewNoteButtonDisabled
                  : styles.reviewNoteButton
              }
              onKeyDown={(e) => {
                e.key === "Enter" && state.actions.saveChanges();
              }}
              onClick={state.actions.saveChanges}
            >
              Save Changes
            </button>
            <button
              className={styles.reviewNoteButton}
              onClick={(e) => {
                e.stopPropagation();
                state.actions.setReview(!state.values.review);
              }}
            >
              Close
            </button>
          </div>
        )}
        <Options
          archived={true}
          review={state.values.review}
          note={note}
          pinned={false}
          styles={styles}
        />
      </NoteWrapper>
    </>
  );
};

export default Note;
