import { IRootState } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useHookProps } from "./interfaces";
import { findPinnedNotes, findUnpinnedNotes } from "./utils";

export const useNotesWithLabelsSection = ({ label }: useHookProps) => {
  const state = useSelector((state: IRootState) => state.notes);
  const { notes, pinnedNotes } = state;
  state.labels.forEach((l) => {
    l.label === label.split(":")[1];
  });

  const currentLabel = state.labels.find(
    (lb) => lb.labelId === label.split(":")[1]
  )!;
  const pnNotes = findPinnedNotes(pinnedNotes, currentLabel);
  const unNotes = findUnpinnedNotes(notes, currentLabel);

  const dummys = () => {};

  return {
    pnNotes,
    unNotes,
    dummys,
    state,
  };
};
