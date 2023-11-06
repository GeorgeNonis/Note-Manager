import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editNoteHttp, pinNoteHandlerHttp } from "../../../services";
import { fetchingDataHandler } from "../../../store/display-state-slice";
import { editNote, pinHandler } from "../../../store/notes-slice";
import { isThereError } from "../../../utils/utils";
import { UseNoteProps } from "./interfaces";

export const useNote = ({ note, pinned }: UseNoteProps) => {
  const [review, setReview] = useState<boolean>(false);
  const [noteValue, setNotedetails] = useState<string>(note.note);
  const [noteTitle, setNoteTitle] = useState<string>(note.title);
  const dispatch = useDispatch();
  const noteId = note.id;

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setReview(!review);
  };

  const saveChanges = async () => {
    // dispatch(fetchingDataHandler());

    const response = await editNoteHttp({
      noteId,
      pinned,
      titleValue: noteTitle,
      noteValue,
    });

    const sucessfullRequest = isThereError(response);
    sucessfullRequest &&
      dispatch(
        editNote({ pinned, id: noteId, titleValue: noteTitle, noteValue })
      );
    // dispatch(fetchingDataHandler());
  };

  const pinNoteHandler = async (e: React.MouseEvent) => {
    dispatch(fetchingDataHandler());

    e.stopPropagation();
    const response = await pinNoteHandlerHttp(note.id, pinned);

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
    },
    actions: {
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
