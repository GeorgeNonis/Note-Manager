import ReactDOM from "react-dom";
import {
  ReviewModal,
  Title,
  NoteDetails,
  DeletedNoteWrapper,
} from "../../index";
import styles from "./styles.module.scss";
import { Props } from "./interface";
import { useDeletedNote } from "./useDeletedNote";

const DeletedNote = ({ note, zindex }: Props) => {
  const {
    review,
    setReview,
    clickOutsideNote,
    restoreProcess,
    removeProcess,
    zIndex,
  } = useDeletedNote({ note, zindex });

  return (
    <>
      {review &&
        ReactDOM.createPortal(
          <ReviewModal />,
          document.getElementById("reviewModal")!
        )}
      <DeletedNoteWrapper
        clickOutsideNote={clickOutsideNote}
        note={note}
        setReview={setReview}
        review={review}
        zIndex={zIndex}
      >
        <Title title={note.title} />
        <NoteDetails note={note.note} />
        <div className={styles.actions}>
          <button onClick={restoreProcess}>Restore Note</button>
          <button onClick={removeProcess}>Delete Note</button>
        </div>
      </DeletedNoteWrapper>
    </>
  );
};

export default DeletedNote;
