import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOutsideClick } from "../../../hooks";
import { IRootState } from "../../../store/store";

export const useArchiveNotesSection = () => {
  const { notes: state, displayState } = useSelector(
    (state: IRootState) => state
  );
  const { error, loadingInitialState } = displayState;
  const [display, setDisplay] = useState<boolean>(false);
  // const dispatch = useDispatch();

  const clickOutsideNote = useOutsideClick(() => {
    setDisplay(false);
  });

  const useStore = {
    values: {
      error,
      loading: loadingInitialState,
      display,
      clickOutsideNote,
      archivedNotes: state.archivedNotes,
    },
    actions: {
      setDisplay,
    },
  };

  return {
    useStore,
  };
};
