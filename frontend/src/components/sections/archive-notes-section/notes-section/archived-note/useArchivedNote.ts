import { useState } from "react";
import { useDispatch } from "react-redux";
import { CustomHook } from "./interfaces";
import { editNoteHttp } from "../../../../../services";
import { isThereError } from "../../../../../utils";
import { editNote } from "../../../../../store/notes-slice";
import { fetchingDataHandler } from "../../../../../store/display-state-slice";

export const useArchivedNote = ({ note, zindex }: CustomHook) => {
  const [review, setReview] = useState<boolean>(false);
  const [noteValue, setNotedetails] = useState<string>(note.note);
  const [noteTitle, setNoteTitle] = useState<string>(note.title);
  const dispatch = useDispatch();
  const noteId = note.id;
  const token = sessionStorage.getItem("auth-token")!;
  const saveChanges = async () => {
    dispatch(fetchingDataHandler());
    const response = await editNoteHttp({
      pinned: false,
      archived: true,
      noteId,
      titleValue: noteTitle,
      noteValue,
      token,
    });

    const sucessfullRequest = isThereError(response);
    sucessfullRequest &&
      dispatch(editNote({ id: noteId, titleValue: noteTitle, noteValue }));
    dispatch(fetchingDataHandler());
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
      saveChanges,
      setNotedetails,
      setNoteTitle,
    },
  };

  return {
    state,
  };
};
