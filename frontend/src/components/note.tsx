import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { pinHandler } from "../store/notesSlice";
import Options from "./options";
import ReviewModal from "./reviewModal";
import { BsPinAngle, BsFillPinFill } from "react-icons/bs";
import styles from "../styles/note.module.scss";
import { pinNoteHandlerHttp } from "../api/api";

interface Props {
  note: {
    note: string;
    title: string;
    id: string;
  };
  zindex: number;
  position: number;
  pinned: boolean;
  onDragEnd: () => void;
  onDragEnter: (e: React.DragEvent, position: number) => void;
  onDragStart: (e: React.DragEvent, position: number) => void;
}

const Note = ({
  note,
  position,
  onDragEnd,
  onDragEnter,
  onDragStart,
  zindex,
  pinned,
}: Props) => {
  const [review, setReview] = useState<boolean>(false);
  const dispatch = useDispatch();

  const outside = useOutsideClick(() => setReview(false));

  const pinNoteHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(pinHandler(note.id));
    await pinNoteHandlerHttp(note.id);
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
        <div className={styles.pin} onClick={pinNoteHandler}>
          {pinned ? (
            <BsFillPinFill className={`${styles.pinned} ${styles.icon}`} />
          ) : (
            <BsPinAngle className={styles.icon} />
          )}
          <span className={styles.span}>Pin note</span>
        </div>
        <h3
          contentEditable="true"
          spellCheck="true"
          aria-multiline="true"
          suppressContentEditableWarning
        >
          {note.title}
        </h3>
        <p
          contentEditable="true"
          spellCheck="true"
          aria-multiline="true"
          suppressContentEditableWarning
        >
          {note.note}
        </p>
        <Options id={note.id} pinned={pinned} />
      </div>
    </>
  );
};

export default Note;
