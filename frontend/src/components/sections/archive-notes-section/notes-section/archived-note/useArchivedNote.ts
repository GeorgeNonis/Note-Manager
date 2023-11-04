import { useState } from "react";
import { useDispatch } from "react-redux";
import { CustomHook } from "./interfaces";
import { editNoteHttp } from "../../../../../services";
import { isThereError } from "../../../../../utils";
import { editNote } from "../../../../../store/notes-slice";

export const useArchivedNote = ({ note }: CustomHook) => {
  const [review, setReview] = useState<boolean>(false);
  const [noteValue, setNotedetails] = useState<string>(note.note);
  const [noteTitle, setNoteTitle] = useState<string>(note.title);
  const dispatch = useDispatch();
  const noteId = note.id;
  const saveChanges = async () => {
    const response = await editNoteHttp({
      pinned: false,
      archived: true,
      noteId,
      titleValue: noteTitle,
      noteValue,
    });

    const sucessfullRequest = isThereError(response);
    sucessfullRequest &&
      dispatch(editNote({ id: noteId, titleValue: noteTitle, noteValue }));
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setReview(!review);
  };

  const disableBtn = noteValue === note.note && noteTitle === note.title;

  const state = {
    values: {
      review,
      disableBtn,
      title: noteTitle,
      noteValue,
      noteTitle,
    },
    actions: {
      handleExpand,
      saveChanges,
      setNotedetails,
      setNoteTitle,
    },
  };

  return {
    state,
  };
};
