import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDnd, useOutsideClick } from "../../../hooks";
import { IRootState } from "../../../store/store";
import { addNote, sortNotes } from "../../../store/notes-slice";
import { NoteObj } from "../../../interfaces/interfaces";
import { notePostHandler, DragEndUtil } from "../../../utils/utils";

export const useExistingNotesSection = () => {
  const { error, loadingInitialState } = useSelector(
    (state: IRootState) => state.displayState
  );
  const state = useSelector((state: IRootState) => state.notes);
  const [display, setDisplay] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const dispatch = useDispatch();

  const { onDragEnter, onDragStart, index, indexOf } = useDnd();

  const clickOutsideNote = useOutsideClick(() => {
    setDisplay(false);
  });

  const onDragEnd = async () => {
    const cb = (arr: Iterable<NoteObj>[]) => {
      console.log(arr);
      dispatch(sortNotes({ arr, pinned: false }));
    };
    await DragEndUtil({ state, index, indexOf, cb, pinned: false });
  };

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setTitle(e.target.value);
    },
    []
  );
  const onChangeNote = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  }, []);

  useEffect(() => {
    if (note.length === 0 && title.length === 0) return;
    const postNote = async () => {
      const { processedNote, boolean } = await notePostHandler(title, note);
      boolean ? dispatch(addNote(processedNote)) : console.log("error");

      setTitle("");
      setNote("");
    };
    postNote();
  }, [display]);

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
      onDragEnd,
      onDragStart,
      onDragEnter,
      onChangeTitle,
      onChangeNote,
    },
  };

  return {
    useStore,
  };
};
