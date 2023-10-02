import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeNoteHttp, restoreNoteHttp } from "../../../services";
import { removeNote, restoreNote } from "../../../store/notes-slice";
import { isThereError } from "../../../utils/utils";
import { Props } from "./interfaces";
import { fetchingDataHandler } from "../../../store/display-state-slice";

export const useDeletedNote = ({ note, zindex }: Props) => {
  const [review, setReview] = useState<boolean>(false);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("auth-token")!;

  const restoreProcess = async (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(fetchingDataHandler());
    e.stopPropagation();

    const response = await restoreNoteHttp(note.id, token);

    const sucessfullRequest = isThereError(response);
    sucessfullRequest && dispatch(restoreNote(note.id));

    dispatch(fetchingDataHandler());
  };

  const removeProcess = async (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(fetchingDataHandler());
    e.stopPropagation();
    const response = await removeNoteHttp(note.id, token);

    const sucessfullRequest = isThereError(response);
    sucessfullRequest && dispatch(removeNote(note.id));

    setReview(false);
    dispatch(fetchingDataHandler());
  };

  const zIndex = !review ? zindex : 20001;

  return {
    review,
    setReview,
    restoreProcess,
    removeProcess,
    zIndex,
  };
};
