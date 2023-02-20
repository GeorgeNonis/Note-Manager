import React, {
  useState,
  useRef,
  MutableRefObject,
  RefObject,
  LegacyRef,
  useEffect,
} from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { editNote, pinHandler } from "../store/notesSlice";
import Options from "./options";
import ReviewModal from "./reviewModal";
import { BsPinAngle, BsFillPinFill } from "react-icons/bs";
import { editNoteHttp, pinNoteHandlerHttp } from "../api/api";
import { Notes } from "./notesSection";
import styles from "../styles/note.module.scss";
import { colorLogic } from "../utils/utils";

interface Props {
  note: Notes;
  zindex: number;
  position: number;
  pinned: boolean;
  onDragEnd: () => void;
  onDragEnter: (e: React.DragEvent, position: number) => void;
  onDragStart: (
    e: React.DragEvent,
    position: number,
    pinned: boolean,
    id: string
  ) => void;
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
  const title = useRef(null) as MutableRefObject<HTMLHeadingElement | null>;
  const paragraph = useRef(
    null
  ) as MutableRefObject<HTMLParagraphElement | null>;
  const noteId = note.id;

  useEffect(() => {
    const titleValue = title.current?.innerText;
    const noteValue = paragraph.current?.innerText;
    if (note.note === noteValue && note.title === titleValue) return;
    dispatch(editNote({ pinned, noteId, titleValue, noteValue }));
    editNoteHttp({ noteId, pinned, noteValue, titleValue });
  }, [review]);

  const pinNoteHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(pinHandler(note.id));
    await pinNoteHandlerHttp(note.id);
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
        ref={outside}
        style={{
          zIndex: zIndex,
          backgroundColor,
        }}
        className={noteStyle}
        onClick={(e) => {
          e.stopPropagation();
          setReview(true);
        }}
        draggable={true}
        onDragStart={(e) => onDragStart(e, position, pinned, note.id)}
        onDragEnter={(e) => onDragEnter(e, position)}
        onDragEnd={onDragEnd}
      >
        <div className={styles.pin} onClick={pinNoteHandler}>
          {pinned ? (
            <BsFillPinFill className={`${styles.pinned} ${styles.icon}`} />
          ) : (
            <BsPinAngle className={styles.icon} />
          )}
          <span className={styles.span}>
            {pinned ? "Unpin Note" : "Pin note"}
          </span>
        </div>
        <h3
          ref={title}
          onChange={(e) => console.log(e.target)}
          contentEditable="true"
          spellCheck="true"
          aria-multiline="true"
          suppressContentEditableWarning
        >
          {note.title}
        </h3>
        <p
          ref={paragraph}
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
