import React, { useState, useRef, MutableRefObject } from "react";
import { useDispatch } from "react-redux";
import { editNoteHttp, pinNoteHandlerHttp } from "../../../services";
import { errorState } from "../../../store/display-state-slice";
import { editNote, pinHandler } from "../../../store/notes-slice";
import { isThereError } from "../../../utils/utils";
import { CustomHook } from "./interfaces";

export const useNote = ({ note, pinned, zindex }: CustomHook) => {
  const [review, setReview] = useState<boolean>(false);
  const [noteValue, setNotedetails] = useState<string>(note.note);
  const [noteTitle, setNoteTitle] = useState<string>(note.title);
  const dispatch = useDispatch();
  const noteId = note.id;

  const token = sessionStorage.getItem("auth-token")!;
  const saveChanges = async () => {
    const response = await editNoteHttp({
      noteId,
      pinned,
      titleValue: noteTitle,
      noteValue,
      token,
    });

    const sucessfullRequest = isThereError(response);
    console.log(sucessfullRequest);
    console.log("Hello");
    sucessfullRequest
      ? dispatch(
          editNote({ pinned, id: noteId, titleValue: noteTitle, noteValue })
        )
      : dispatch(errorState(response[1]?.message));
  };

  const pinNoteHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(
      "pinning note --- inside from pinNoteHandler from useNote Hook"
    );
    const response = await pinNoteHandlerHttp(note.id, pinned, token);

    const sucessfullRequest = isThereError(response);
    sucessfullRequest
      ? dispatch(pinHandler(note.id))
      : dispatch(errorState(response[1]?.message));
  };
  // const zIndex = !review ? zindex : 20002;
  const zIndex = !review ? "auto" : 20002;
  const disableBtn = noteValue === note.note && noteTitle === note.title;

  const state = {
    values: {
      review,
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
