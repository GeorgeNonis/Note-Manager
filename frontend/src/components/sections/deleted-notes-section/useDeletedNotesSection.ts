import { IRootState } from "../../../store/store";
import { useSelector } from "react-redux";

export const useDeletedNotesSection = () => {
  const { deletedNotes } = useSelector((state: IRootState) => state.notes);
  const { loadingInitialState } = useSelector(
    (state: IRootState) => state.displayState
  );

  return { loadingInitialState, deletedNotes };
};
