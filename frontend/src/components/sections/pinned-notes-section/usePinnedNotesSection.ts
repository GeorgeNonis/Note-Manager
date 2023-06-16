import { useDispatch, useSelector } from "react-redux";
import { useDnd } from "../../../hooks/useDnD";
import { sortNotes } from "../../../store/notes-slice";
import { IRootState } from "../../../store/store";
import { NoteObj } from "../../../interfaces/interfaces";
import { DragEndUtil } from "../../../utils/utils";
import { errorState } from "../../../store/display-state-slice";

export const usePinnedNotesSection = () => {
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
        // dispatch(errorState(arr));
      }
      dispatch(sortNotes({ arr, pinned: true }));
    };
    // console.log("pinned note");
    await DragEndUtil({ state, index, indexOf, cb, pinned: true, token });
  };

  return {
    onDragEnter,
    onDragStart,
    onDragEnd,
  };
};
