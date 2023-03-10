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
  const test = state.values.noteValue === note.note;
  // console.log(state.values.noteValue === note.note);
  console.log(state.values.noteValue);
  console.log(note.note);
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
          title={note.title}
          titleRef={state.values.title}
          editable={true}
        />
        <textarea
          name="notedetails"
          id="notedetails"
          defaultValue={note.note}
          onChange={(e) => state.actions.setNotedetails(e.target.value)}
        />
        {/* <NoteDetails
          pinned={pinned}
          note={note}
          checkbox={note.checkbox}
          noteRef={state.values.noteDetails}
          editable={true}
        /> */}
        {state.values.review && (
          <div className={styles.actions}>
            <button
              disabled={
                state.values.noteDetails.current?.innerText === note.note
              }
              // className={styles.reviewNoteButton}
              className={
                test ? styles.reviewNoteButtonDisabled : styles.reviewNoteButton
              }
              onClick={state.actions.saveChanges}
            >
              Save Changes
            </button>
            <button
              className={styles.reviewNoteButton}
              onClick={() => {
                console.log("clicking");
                state.actions.setReview(false);
              }}
            >
              Close
            </button>
          </div>
        )}
        <Options note={note} pinned={pinned} styles={styles} />
        {/* Testing Purposes */}

        {/* Testing Purposes */}
      </NoteWrapper>
    </>
  );
};

export default Note;
