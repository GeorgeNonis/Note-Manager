import ReactDOM from "react-dom";
import {
  ReviewModal,
  Title,
  NoteDetails,
  DeletedNoteWrapper,
} from "../../index";
import styles from "./styles.module.scss";
import { Props } from "./interfaces";
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
          <ReviewModal setReview={setReview} />,
          document.getElementById("reviewModal")!
        )}
      <DeletedNoteWrapper
        note={note}
        setReview={setReview}
        review={review}
        zIndex={zIndex}
      >
        <Title title={note.title} />
        <NoteDetails note={note} />
        <div className={styles.actions}>
          <button onClick={restoreProcess}>Restore Note</button>
          <button onClick={removeProcess}>Delete Note</button>
        </div>
      </DeletedNoteWrapper>
    </>
  );
};

export default DeletedNote;
