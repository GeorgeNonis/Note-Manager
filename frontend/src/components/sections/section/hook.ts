import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store/store";
import { useDnd } from "../../../hooks";
import { NoteObj } from "../../../interfaces/interfaces";
import { sortNotes } from "../../../store/notes-slice";
import { DragEndUtil } from "../../../utils";

export const useSection = () => {
  const token = sessionStorage.getItem("auth-token")!;
  const state = useSelector((state: IRootState) => state.notes);
  const { onDragEnter, onDragStart, index, indexOf } = useDnd();
  const dispatch = useDispatch();

  /**
   * Hook to detect outside click from the note's div
   * so you can close it
   */
  const onDragEnd = async () => {
    const cb = (arr: Iterable<NoteObj>[]) => {
      if (!Array.isArray(arr)) {
      }
      dispatch(sortNotes({ arr, pinned: true }));
    };

    await DragEndUtil({ state, index, indexOf, cb, pinned: true, token });
  };

  return {
    onDragEnter,
    onDragStart,
    onDragEnd,
  };
};
