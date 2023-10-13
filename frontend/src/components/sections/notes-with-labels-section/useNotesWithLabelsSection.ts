import { IRootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useHookProps } from "./interfaces";
import { findPinnedNotes, findUnpinnedNotes } from "./utils";

export const useNotesWithLabelsSection = ({ label }: useHookProps) => {
  const state = useSelector((state: IRootState) => state.notes);
  const { notes, pinnedNotes } = state;

  const currentLabel = state.labels.find(
    (lb) => lb.labelId === label.split(":")[1]
  )!;
  const pnNotes = findPinnedNotes(pinnedNotes, currentLabel);
  const unNotes = findUnpinnedNotes(notes, currentLabel);

  return {
    pnNotes,
    unNotes,
  };
};
