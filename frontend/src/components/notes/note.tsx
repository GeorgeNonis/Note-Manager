import React, { useState, useRef, MutableRefObject, useEffect } from "react";
import ReactDOM from "react-dom";
import { NoteProps } from "../../interfaces/interfaces";
import { editNoteHttp, pinNoteHandlerHttp } from "../../api/api";
import { useDispatch } from "react-redux";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { editNote, pinHandler } from "../../store/notesSlice";
import Options from "../notesComponents/actions/options";
import ReviewModal from "../modal/reviewModal";
import { Title } from "../notesComponents/title";
import { NoteDetails } from "../notesComponents/noteDetails";
import Pin from "../notesComponents/pin";
import styles from "../../styles/note.module.scss";
import NoteWrapper from "../notesComponents/wrappers/noteWrapper";

const Note = ({
  note,
  position,
  onDragEnd,
  onDragEnter,
  onDragStart,
  zindex,
  pinned,
}: NoteProps) => {
  const [review, setReview] = useState<boolean>(false);
  const dispatch = useDispatch();
  const clickOutsideNote = useOutsideClick(() => setReview(false));
  const title = useRef(null) as MutableRefObject<HTMLHeadingElement | null>;
  const noteDetails = useRef(
    null
  ) as MutableRefObject<HTMLParagraphElement | null>;
  const noteId = note.id;

  useEffect(() => {
    const titleValue = title.current?.innerText;
    const noteValue = noteDetails.current?.innerText;
    if (note.note === noteValue && note.title === titleValue) return;
    dispatch(editNote({ pinned, noteId, titleValue, noteValue }));
    editNoteHttp({ noteId, pinned, noteValue, titleValue });
  }, [review]);

  const pinNoteHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(pinHandler(note.id));
    await pinNoteHandlerHttp(note.id);
  };

  const zIndex = !review ? zindex : 10000;

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
      {/* </div> */}
    </>
  );
};

export default Note;
