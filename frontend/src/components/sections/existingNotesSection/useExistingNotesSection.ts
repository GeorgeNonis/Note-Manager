import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDnd, useOutsideClick } from "../../../hooks";
import { getNotesHttp } from "../../../api/api";
import { IRootState } from "../../../store/store";
import {
  addNote,
  initial,
  errorState,
  sortNotes,
} from "../../../store/notesSlice";
import { DragEndUtil } from "../../../utils";
import { NoteObj } from "../../../interfaces/interfaces";
import {
  IfNetworkDown,
  isThereError,
  notePostHandler,
} from "../../../utils/utils";

export const useExistingNotesSection = () => {
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const state = useSelector((state: IRootState) => state.notes);
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
    const fetch = async () => {
      dispatch(errorState(""));
      const response = await getNotesHttp();
      console.log(response);

      const sucessfullRequest = isThereError(response);
      if (sucessfullRequest) {
        dispatch(initial(response[0]));
      } else {
        const msg = response[1]?.message!;
        dispatch(errorState(IfNetworkDown(msg)));
      }

      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (note.length === 0 && title.length === 0) return;
    const postNote = async () => {
      const { processedNote, boolean } = await notePostHandler(title, note);
      console.log(boolean);
      boolean ? dispatch(addNote(processedNote)) : console.log("error");

      setTitle("");
      setNote("");
    };
    postNote();
  }, [display]);

  return {
    loading,
    display,
    note,
    title,
    state,
    setDisplay,
    onDragEnd,
    onDragStart,
    onDragEnter,
    onChangeTitle,
    onChangeNote,
    clickOutsideNote,
  };
};
