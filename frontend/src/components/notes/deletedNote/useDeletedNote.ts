import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeNoteHttp, restoreNoteHttp } from "../../../api/api";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { removeNote, restoreNote } from "../../../store/notesSlice";
import { isThereError } from "../../../utils/utils";
import { Props } from "./interface";

export const useDeletedNote = ({ note, zindex }: Props) => {
  const [review, setReview] = useState<boolean>(false);
  const dispatch = useDispatch();

  const clickOutsideNote = useOutsideClick(() => setReview(false));

  const restoreProcess = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const response = await restoreNoteHttp(note.id);

    const sucessfullRequest = isThereError(response);
    sucessfullRequest
      ? dispatch(restoreNote(note.id))
      : console.log(response[1]?.message);
  };

  const removeProcess = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const response = await removeNoteHttp(note.id);

    const sucessfullRequest = isThereError(response);
    sucessfullRequest
      ? dispatch(removeNote(note.id))
      : console.log(response[1]?.message);

    setReview(false);
  };

  const zIndex = !review ? zindex : 10000;

  return {
    review,
    setReview,
    clickOutsideNote,
    restoreProcess,
    removeProcess,
    zIndex,
  };
};

// const [review, setReview] = useState<boolean>(false);
//   const dispatch = useDispatch();

//   const clickOutsideNote = useOutsideClick(() => setReview(false));

//   const restoreProcess = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();

//     const response = await restoreNoteHttp(note.id);

//     const sucessfullRequest = isThereError(response);
//     sucessfullRequest
//       ? dispatch(restoreNote(note.id))
//       : console.log(response[1]?.message);
//   };

//   const removeProcess = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();
//     const response = await removeNoteHttp(note.id);

//     const sucessfullRequest = isThereError(response);
//     sucessfullRequest
//       ? dispatch(removeNote(note.id))
//       : console.log(response[1]?.message);

//     setReview(false);
//   };

//   const zIndex = !review ? zindex : 10000;
