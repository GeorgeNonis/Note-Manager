import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editNoteHttp, pinNoteHandlerHttp } from "../../../services";
import { fetchingDataHandler } from "../../../store/display-state-slice";
import { editNote, pinHandler } from "../../../store/notes-slice";
import { isThereError } from "../../../utils/utils";
import { CustomHook } from "./interfaces";

export const useNote = ({ note, pinned }: CustomHook) => {
  const [initialPosition, setInitialPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [review, setReview] = useState<boolean>(false);
  const [noteValue, setNotedetails] = useState<string>(note.note);
  const [noteTitle, setNoteTitle] = useState<string>(note.title);
  const dispatch = useDispatch();
  const noteId = note.id;

  const token = sessionStorage.getItem("auth-token")!;

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setReview(!review);
  };

  const saveChanges = async () => {
    dispatch(fetchingDataHandler());

    const response = await editNoteHttp({
      noteId,
      pinned,
      titleValue: noteTitle,
      noteValue,
      token,
    });

    const sucessfullRequest = isThereError(response);
    sucessfullRequest &&
      dispatch(
        editNote({ pinned, id: noteId, titleValue: noteTitle, noteValue })
      );
    dispatch(fetchingDataHandler());
  };

  const pinNoteHandler = async (e: React.MouseEvent) => {
    dispatch(fetchingDataHandler());

    e.stopPropagation();
    const response = await pinNoteHandlerHttp(note.id, pinned, token);

    const sucessfullRequest = isThereError(response);
    sucessfullRequest && dispatch(pinHandler(note.id));
    dispatch(fetchingDataHandler());
  };
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
      initialPosition,
    },
    actions: {
      setReview,
      pinNoteHandler,
      saveChanges,
      setNotedetails,
      setNoteTitle,
      handleExpand,
    },
  };

  return {
    state,
  };
};
