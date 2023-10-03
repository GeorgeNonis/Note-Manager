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
  const { actions, values } = state;
  return (
    <>
      <Transition in={values.review} timeout={500} mountOnEnter unmountOnExit>
        {(transState) => (
          <ReviewModal
            setReview={actions.setReview}
            transitionState={transState}
          />
        )}
      </Transition>
      <NoteWrapper
        dragable={dragable}
        zIndex={values.zIndex}
        position={position}
        pinned={pinned}
        review={values.review}
        setReview={actions.setReview}
        note={note}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDragStart={onDragStart}
      >
        <Pin
          pinned={pinned}
          pinNoteHandler={actions.pinNoteHandler}
          styles={styles}
        />

        <Title
          editable={false}
          title={values.noteTitle}
          setNoteTitle={actions.setNoteTitle}
        />
        <NoteDetails
          editable={false}
          setNotedetails={actions.setNotedetails}
          pinned={pinned}
          note={note}
          noteValue={values.noteValue}
          checkbox={note.checkbox}
        />
        {values.review && (
          <div className={styles.actions}>
            <button
              disabled={values.disableBtn}
              className={
                values.disableBtn
                  ? styles.reviewNoteButtonDisabled
                  : styles.reviewNoteButton
              }
              onKeyDown={(e) => {
                e.key === "Enter" && actions.saveChanges();
              }}
              onClick={actions.saveChanges}
            >
              Save Changes
            </button>
            <button
              className={styles.reviewNoteButton}
              onClick={(e) => {
                e.stopPropagation();
                actions.setReview(!values.review);
              }}
            >
              Close
            </button>
          </div>
        )}
        <Options
          review={values.review}
          note={note}
          pinned={pinned}
          styles={styles}
        />
      </NoteWrapper>
    </>
  );
};

export default Note;
