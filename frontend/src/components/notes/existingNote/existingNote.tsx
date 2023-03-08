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
          <ReviewModal />,
          document.getElementById("reviewModal")!
        )}
      <NoteWrapper
        dragable={dragable}
        zIndex={state.values.zIndex}
        position={position}
        pinned={pinned}
        review={state.values.review}
        setReview={state.actions.setReview}
        clickOutsideNote={state.values.clickOutsideNote}
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
        <NoteDetails
          pinned={pinned}
          note={note}
          checkbox={note.checkbox}
          noteRef={state.values.noteDetails}
          editable={true}
        />
        <Options note={note} pinned={pinned} styles={styles} />
      </NoteWrapper>
    </>
  );
};

export default Note;
