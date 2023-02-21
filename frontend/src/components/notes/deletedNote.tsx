import React, { useState } from "react";
import ReactDOM from "react-dom";
import { colorLogic } from "../../utils/utils";
import { Notes } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { removeNoteHttp, restoreNoteHttp } from "../../api/api";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { removeNote, restoreNote } from "../../store/notesSlice";
import ReviewModal from "../modal/reviewModal";
import { Title } from "../notesComponents/title";
import { NoteDetails } from "../notesComponents/noteDetails";
import styles from "../styles/note.module.scss";

interface Props {
  note: Notes;
  zindex: number;
}

const DeletedNote = ({ note, zindex }: Props) => {
  const [review, setReview] = useState<boolean>(false);
  const dispatch = useDispatch();

  const outsideNote = useOutsideClick(() => setReview(false));

  const restoreProcess = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await restoreNoteHttp(note.id);
    dispatch(restoreNote(note.id));
  };

  const removeProcess = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await removeNoteHttp(note.id);
    dispatch(removeNote(note.id));
    setReview(false);
  };

  const noteStyle = !review ? styles.note : `${styles.note} ${styles.review}`;
  const zIndex = !review ? zindex : 10000;

  const backgroundColor = colorLogic({ review, note });
  return (
    <>
      {review &&
        ReactDOM.createPortal(
          <ReviewModal />,
          document.getElementById("reviewModal")!
        )}
      <div
        ref={outsideNote}
        style={{ zIndex: zIndex, backgroundColor }}
        className={noteStyle}
        onClick={(e) => {
          e.stopPropagation();
          setReview(true);
        }}
        aria-multiline="true"
      >
        <Title title={note.title} />
        <NoteDetails note={note.note} />
        <div className={styles.actions}>
          <button onClick={restoreProcess}>Restore Note</button>
          <button onClick={removeProcess}>Delete Note</button>
        </div>
      </div>
    </>
  );
};

export default DeletedNote;
