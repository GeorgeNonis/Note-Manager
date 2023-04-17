import { NoteProps } from "./interfaces";
import {
  Options,
  ReviewModal,
  Title,
  NoteDetails,
  Pin,
  NoteWrapper,
} from "../../index";
import { useNote } from "./useNote";
import { Transition } from "react-transition-group";
import styles from "../note.module.scss";

const Note = ({
  note,
  position,
  onDragEnd,
  onDragEnter,
  onDragStart,
  zindex,
  pinned = true,
  dragable = true,
}: NoteProps) => {
  const { state } = useNote({ note, pinned, zindex });
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
        dragable={dragable}
        zIndex={state.values.zIndex}
        position={position}
        pinned={pinned}
        review={state.values.review}
        setReview={state.actions.setReview}
        note={note}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDragStart={onDragStart}
      >
        <Pin
          pinned={pinned}
          pinNoteHandler={state.actions.pinNoteHandler}
          styles={styles}
        />

        <Title
          editable={false}
          title={state.values.noteTitle}
          setNoteTitle={state.actions.setNoteTitle}
        />
        <NoteDetails
          editable={false}
          setNotedetails={state.actions.setNotedetails}
          pinned={pinned}
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
          review={state.values.review}
          note={note}
          pinned={pinned}
          styles={styles}
        />
      </NoteWrapper>
    </>
  );
};

export default Note;
