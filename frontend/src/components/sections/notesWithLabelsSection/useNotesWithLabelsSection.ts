import { useState } from "react";
import { IRootState } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useHookProps } from "./interfaces";
import { findPinnedNotes, findUnpinnedNotes } from "./utils";

export const useNotesWithLabelsSection = ({ label }: useHookProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const state = useSelector((state: IRootState) => state.notes);
  const { notes, pinnedNotes, labels } = state;

  const currentLabel = state.labels.find(
    (lb) => lb.label === label.split(":")[1]
  )!;

  const pnNotes = findPinnedNotes(pinnedNotes, currentLabel);
  const unNotes = findUnpinnedNotes(notes, currentLabel);

  const dummys = () => {};

  return {
    pnNotes,
    unNotes,
    dummys,
    loading,
    state,
  };
};
