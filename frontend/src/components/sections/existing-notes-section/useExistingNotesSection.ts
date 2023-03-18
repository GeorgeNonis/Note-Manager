import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDnd, useOutsideClick } from "../../../hooks";
import { IRootState } from "../../../store/store";
import { addNote, sortNotes } from "../../../store/notes-slice";
import { NoteObj } from "../../../interfaces/interfaces";
import { notePostHandler, DragEndUtil } from "../../../utils/utils";

export const useExistingNotesSection = () => {
  const { notes: state, displayState } = useSelector(
    (state: IRootState) => state
  );
  const { error, loadingInitialState } = displayState;
  const [display, setDisplay] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const dispatch = useDispatch();

  const { onDragEnter, onDragStart, index, indexOf } = useDnd();

  const clickOutsideNote = useOutsideClick(() => {
    setDisplay(false);
  });

  const onDragEnd = async (e: React.DragEvent) => {
    const cb = (arr: Iterable<NoteObj>[]) => {
      console.log(arr);
      dispatch(sortNotes({ arr, pinned: false }));
    };
    await DragEndUtil({ state, index, indexOf, cb, pinned: false });
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const onChangeNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const saveNote = async () => {
    const { processedNote, boolean } = await notePostHandler(title, note);
    boolean ? dispatch(addNote(processedNote)) : console.log("error");

    setTitle("");
    setNote("");
  };

  const clearInputs = () => {
    setTitle("");
    setNote("");
  };

  const useStore = {
    values: {
      error,
      loading: loadingInitialState,
      display,
      note,
      title,
      clickOutsideNote,
      state,
    },
    actions: {
      setDisplay,
      onDragStart,
      onDragEnd,
      onDragEnter,
      onChangeTitle,
      onChangeNote,
      saveNote,
      clearInputs,
    },
  };

  return {
    useStore,
  };
};
