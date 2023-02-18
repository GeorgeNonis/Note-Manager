import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { BsPinAngle } from "react-icons/bs";
import { removeNoteHttp, restoreNoteHttp } from "../api/api";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { removeNote, restoreNote } from "../store/notesSlice";
import styles from "../styles/note.module.scss";
import ReviewModal from "./reviewModal";

interface Props {
  note: {
    note: string;
    title: string;
    id: string;
  };
  zindex: number;
  position: number;
  onDragEnd: () => void;
  onDragEnter: (e: React.DragEvent, position: number) => void;
  onDragStart: (e: React.DragEvent, position: number) => void;
}

const DeletedNote = ({
  note,
  position,
  onDragEnd,
  onDragEnter,
  onDragStart,
  zindex,
}: Props) => {
  const [review, setReview] = useState<boolean>(false);
  const dispatch = useDispatch();

  const outside = useOutsideClick(() => setReview(false));

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
  return (
    <>
      {review &&
        ReactDOM.createPortal(
          <ReviewModal />,
          document.getElementById("reviewModal")!
        )}
      <div
        ref={outside}
        style={{ zIndex: zIndex }}
        className={noteStyle}
        onClick={(e) => {
          e.stopPropagation();
          setReview(!review);
        }}
        draggable={true}
        onDragStart={(e) => onDragStart(e, position)}
        onDragEnter={(e) => onDragEnter(e, position)}
        onDragEnd={onDragEnd}
      >
        <h3 aria-multiline="true">{note.title}</h3>
        <p aria-multiline="true">{note.note}</p>
        <div className={styles.actions}>
          <button onClick={restoreProcess}>Restore Note</button>
          <button onClick={removeProcess}>Delete Note</button>
        </div>
      </div>
    </>
  );
};

export default DeletedNote;
