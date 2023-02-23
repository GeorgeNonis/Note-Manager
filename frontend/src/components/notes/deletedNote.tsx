import React, { useState } from "react";
import ReactDOM from "react-dom";
import { NoteObj } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { removeNoteHttp, restoreNoteHttp } from "../../api/api";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { removeNote, restoreNote } from "../../store/notesSlice";
import { ReviewModal, Title, NoteDetails, DeletedNoteWrapper } from "../index";
import styles from "../../styles/note.module.scss";
import { isThereError } from "../../utils/utils";

interface Props {
  note: NoteObj;
  zindex: number;
}

const DeletedNote = ({ note, zindex }: Props) => {
  const [review, setReview] = useState<boolean>(false);
  const dispatch = useDispatch();

  const clickOutsideNote = useOutsideClick(() => setReview(false));

  const restoreProcess = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const response = await restoreNoteHttp(note.id);

    const sucessfullRequest = isThereError(response);
    sucessfullRequest
      ? dispatch(restoreNote(note.id))
      : console.log(response[1]?.message);
  };

  const removeProcess = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const response = await removeNoteHttp(note.id);

    const sucessfullRequest = isThereError(response);
    sucessfullRequest
      ? dispatch(removeNote(note.id))
      : console.log(response[1]?.message);

    setReview(false);
  };

  const zIndex = !review ? zindex : 10000;

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
