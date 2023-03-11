import React, { useState, useRef, MutableRefObject } from "react";
import { useDispatch } from "react-redux";
import { editNoteHttp, pinNoteHandlerHttp } from "../../../services";
import { editNote, pinHandler } from "../../../store/notes-slice";
import { isThereError } from "../../../utils/utils";
import { CustomHook } from "./interfaces";

export const useNote = ({ note, pinned, zindex }: CustomHook) => {
  const [review, setReview] = useState<boolean>(false);
  const [noteValue, setNotedetails] = useState<string>(note.note);
  const [noteTitle, setNoteTitle] = useState<string>(note.title);
  const dispatch = useDispatch();
  // const title = useRef(null) as MutableRefObject<HTMLHeadingElement | null>;
  const noteId = note.id;

  const saveChanges = async () => {
    console.log("saving changes");
    // const titleValue = title.current?.innerText;
    const response = await editNoteHttp({
      noteId,
      pinned,
      titleValue: noteTitle,
      noteValue,
    });

    const sucessfullRequest = isThereError(response);
    sucessfullRequest
      ? dispatch(
          editNote({ pinned, id: noteId, titleValue: noteTitle, noteValue })
        )
      : console.log(response[1]?.message);
  };

  const pinNoteHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const response = await pinNoteHandlerHttp(note.id);

    const sucessfullRequest = isThereError(response);
    sucessfullRequest
      ? dispatch(pinHandler(note.id))
      : console.log(response[1]?.message);
  };
  const zIndex = !review ? zindex : 20002;
  const disableBtn = noteValue === note.note && noteTitle === note.title;

  const state = {
    values: {
      review,
      // clickOutsideNote,
      disableBtn,
      zIndex,
      title: noteTitle,
      noteValue,
      noteTitle,
    },
    actions: {
      setReview,
      pinNoteHandler,
      saveChanges,
      setNotedetails,
      setNoteTitle,
    },
  };

  return {
    state,
  };
};
