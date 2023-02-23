import React, { useState, useRef, MutableRefObject, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { NoteProps } from "../../interfaces/interfaces";
import { editNoteHttp, pinNoteHandlerHttp } from "../../api/api";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { editNote, pinHandler } from "../../store/notesSlice";
import {
  Options,
  ReviewModal,
  Title,
  NoteDetails,
  Pin,
  NoteWrapper,
} from "../index";
import styles from "../../styles/note.module.scss";
import { isThereError } from "../../utils/utils";

const Note = ({
  note,
  position,
  onDragEnd,
  onDragEnter,
  onDragStart,
  zindex,
  pinned,
}: NoteProps) => {
  // console.log(note);
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

    const editNoteHandler = async () => {
      const response = await editNoteHttp({
        noteId,
        pinned,
        noteValue,
        titleValue,
      });

      const sucessfullRequest = isThereError(response);
      sucessfullRequest
        ? dispatch(editNote({ pinned, noteId, titleValue, noteValue }))
        : console.log(response[1]?.message);
    };
    editNoteHandler();
  }, [review]);

  const pinNoteHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const response = await pinNoteHandlerHttp(note.id);

    const sucessfullRequest = isThereError(response);
    sucessfullRequest
      ? dispatch(pinHandler(note.id))
      : console.log(response[1]?.message);
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
    </>
  );
};

export default Note;
