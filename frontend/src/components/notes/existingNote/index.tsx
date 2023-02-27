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
import styles from "../note.module.scss";
import { useNote } from "./useNote";

const Note = ({
  note,
  position,
  onDragEnd,
  onDragEnter,
  onDragStart,
  zindex,
  pinned,
}: NoteProps) => {
  const {
    review,
    setReview,
    zIndex,
    clickOutsideNote,
    pinNoteHandler,
    title,
    noteDetails,
  } = useNote({ note, pinned, zindex });

  return (
    <>
      {review &&
        ReactDOM.createPortal(
          <ReviewModal />,
          document.getElementById("reviewModal")!
        )}
      <NoteWrapper
        zIndex={zIndex}
        position={position}
        pinned={pinned}
        review={review}
        setReview={setReview}
        clickOutsideNote={clickOutsideNote}
        note={note}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDragStart={onDragStart}
      >
        <Pin pinned={pinned} pinNoteHandler={pinNoteHandler} styles={styles} />
        <Title title={note.title} titleRef={title} editable={true} />
        <NoteDetails note={note.note} noteRef={noteDetails} editable={true} />
        <Options id={note.id} pinned={pinned} />
      </NoteWrapper>
    </>
  );
};

export default Note;
