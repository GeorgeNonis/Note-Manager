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

  const [styles, setStyles] = useState<React.CSSProperties | undefined>();

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (review) {
      setReview(false);
      setStyles(undefined);
    } else {
      const rect = (e.target as Element).getBoundingClientRect();

      const targetLeft = window.innerWidth / 2 - rect.width / 2;
      const targetTop = window.innerHeight / 2 - rect.height / 2;

      const translateX = targetLeft - rect.left;
      const translateY = targetTop - rect.top;

      setReview(true);
      setStyles({
        position: "fixed",
        top: rect.top + "px",
        left: rect.left + "px",
        width: rect.width + "px",
        height: rect.height + "px",
        zIndex: 1000,
        transform: `translate(${translateX}px, ${translateY}px) scale(1.5)`,
      });
    }
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
      styles,
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
