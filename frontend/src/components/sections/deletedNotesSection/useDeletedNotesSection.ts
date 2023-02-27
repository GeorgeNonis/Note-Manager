import { IRootState } from "../../../store/store";
import { useSelector } from "react-redux";

export const useDeletedNotesSection = () => {
  const state = useSelector((state: IRootState) => state.notes);

  //   if (state.error) return <p className={styles.error}>{state.error}</p>;
  return { state };
};
