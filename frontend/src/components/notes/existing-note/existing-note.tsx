import ReactDOM from "react-dom";
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
import styles from "../note.module.scss";

const Note = ({
  note,
  position,
  onDragEnd,
  onDragEnter,
  onDragStart,
  zindex,
  pinned,
  dragable,
}: NoteProps) => {
  const { state } = useNote({ note, pinned, zindex });
  return (
    <>
      {state.values.review &&
        ReactDOM.createPortal(
          <ReviewModal setReview={state.actions.setReview} />,
          document.getElementById("reviewModal")!
        )}
      <NoteWrapper
        dragable={dragable}
        zIndex={state.values.zIndex}
        position={position}
        pinned={pinned}
        review={state.values.review}
        setReview={state.actions.setReview}
        // clickOutsideNote={state.values.clickOutsideNote}
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
          title={note.title}
          setNoteTitle={state.actions.setNoteTitle}
        />
        <NoteDetails
          editable={false}
          setNotedetails={state.actions.setNotedetails}
          pinned={pinned}
          note={note}
          checkbox={note.checkbox}
        />
        {state.values.review && (
          <div className={styles.actions}>
            <button
              disabled={state.values.disableBtn}
              // className={styles.reviewNoteButton}
              className={
                state.values.disableBtn
                  ? styles.reviewNoteButtonDisabled
                  : styles.reviewNoteButton
              }
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
