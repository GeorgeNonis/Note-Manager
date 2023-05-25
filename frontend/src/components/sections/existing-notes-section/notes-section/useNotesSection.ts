import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDnd } from "../../../../hooks";
import { NoteObj } from "../../../../interfaces/interfaces";
import { errorState } from "../../../../store/display-state-slice";
import { sortNotes, sortUnpinnedNotes } from "../../../../store/notes-slice";
import { IRootState } from "../../../../store/store";
import { DragEndUtil } from "../../../../utils";

export const useNotesSection = () => {
  const state = useSelector((state: IRootState) => state.notes);
  const { onDragEnter, onDragStart, index, indexOf } = useDnd();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("auth-token")!;

  /**
   * Hook to detect outside click from the note's div
   * so you can close it
   */
  const onDragEnd = async (e: React.DragEvent) => {
    const id = e.dataTransfer.getData("id");

    const draggable =
      e.currentTarget.attributes.getNamedItem("draggable")?.value;
    if (!draggable) return;
    const cb = (arr: Iterable<NoteObj>[]) => {
      dispatch(sortUnpinnedNotes(arr));
      if (!Array.isArray(arr)) {
      }
    };

    await DragEndUtil({ state, index, indexOf, cb, pinned: false, token });
  };

  return {
    onDragEnter,
    onDragStart,
    onDragEnd,
  };
};
