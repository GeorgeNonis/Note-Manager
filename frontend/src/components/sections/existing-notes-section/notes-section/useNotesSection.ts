import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDnd } from "../../../../hooks";
import { NoteObj } from "../../../../interfaces/interfaces";
import { errorState } from "../../../../store/display-state-slice";
import { sortNotes } from "../../../../store/notes-slice";
import { IRootState } from "../../../../store/store";
import { DragEndUtil } from "../../../../utils";

export const useNotesSection = () => {
  const state = useSelector((state: IRootState) => state.notes);
  const { onDragEnter, onDragStart, index, indexOf } = useDnd();
  const dispatch = useDispatch();

  /**
   * Hook to detect outside click from the note's div
   * so you can close it
   */
  const onDragEnd = async (e: React.DragEvent) => {
    const id = e.dataTransfer.getData("id");
    // console.log(id);

    const draggable =
      e.currentTarget.attributes.getNamedItem("draggable")?.value;
    // console.log(draggable);
    if (!draggable) return;
    const cb = (arr: Iterable<NoteObj>[]) => {
      if (!Array.isArray(arr)) {
        dispatch(errorState(arr));
      }
      dispatch(sortNotes({ arr, pinned: false }));
    };
    await DragEndUtil({ state, index, indexOf, cb, pinned: false });
  };

  return {
    onDragEnter,
    onDragStart,
    onDragEnd,
  };
};
