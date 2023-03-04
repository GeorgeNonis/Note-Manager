import React, { useState, useRef, MutableRefObject, useEffect } from "react";

import { useDispatch } from "react-redux";
import { editNoteHttp, pinNoteHandlerHttp } from "../../../services";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { editNote, pinHandler } from "../../../store/notesSlice";
import { isThereError } from "../../../utils/utils";
import { CustomHook } from "./interfaces";

export const useNote = ({ note, pinned, zindex }: CustomHook) => {
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
        titleValue,
        noteValue,
      });

      const sucessfullRequest = isThereError(response);
      sucessfullRequest
        ? dispatch(editNote({ pinned, id: noteId, titleValue, noteValue }))
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

  return {
    review,
    setReview,
    clickOutsideNote,
    pinNoteHandler,
    zIndex,
    title,
    noteDetails,
  };
};
