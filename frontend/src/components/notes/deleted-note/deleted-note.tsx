// import ReactDOM from "react-dom";
import {
  // ReviewModal,
  Title,
  NoteDetails,
  DeletedNoteWrapper,
} from "../../index";
import { Props } from "./interfaces";
import { useDeletedNote } from "./useDeletedNote";
import styles from "./styles.module.scss";
import { StyledBackdrop } from "../../Molecules/Modal/modal.styles";

const DeletedNote = ({ note, zindex }: Props) => {
  const { review, restoreProcess, removeProcess, handleExpand, zIndex } =
    useDeletedNote({ note, zindex });
  return (
    <>
      {/* {review &&
        ReactDOM.createPortal(
          <ReviewModal setReview={setReview} />,
          document.getElementById("reviewModal")!
        )} */}
      <StyledBackdrop isOpen={review} onClick={handleExpand} />
      <DeletedNoteWrapper
        note={note}
        onClick={handleExpand}
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
