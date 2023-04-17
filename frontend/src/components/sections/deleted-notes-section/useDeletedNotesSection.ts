import { IRootState } from "../../../store/store";
import { useSelector } from "react-redux";

export const useDeletedNotesSection = () => {
  const notesState = useSelector((state: IRootState) => state.notes);
  const { error, loadingInitialState } = useSelector(
    (state: IRootState) => state.displayState
  );

  const state = {
    notes: notesState,
    displayState: {
      error,
      loadingInitialState,
    },
  };
  return { state };
};
