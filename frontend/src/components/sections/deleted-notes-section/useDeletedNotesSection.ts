import { useState } from "react";
import { IRootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { removeNoteHttp, restoreNoteHttp } from "../../../services";
import { isThereError } from "../../../utils";
import { removeNote, restoreNote } from "../../../store/notes-slice";

export const useDeletedNotesSection = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("auth-token")!;

  const notesState = useSelector((state: IRootState) => state.notes);
  const { error, loadingInitialState } = useSelector(
    (state: IRootState) => state.displayState
  );

  const loadingHandler = (arg: boolean) => {
    setLoading(arg);
  };

  const restoreProcess = async (e: React.MouseEvent, id: string) => {
    loadingHandler(true);
    e.stopPropagation();
    const response = await restoreNoteHttp(id, token);

    const successfulRequest = isThereError(response);
    successfulRequest && dispatch(restoreNote(id));
    loadingHandler(false);
  };

  const removeProcess = async (e: React.MouseEvent, id: string) => {
    loadingHandler(true);
    e.stopPropagation();
    const response = await removeNoteHttp(id, token);

    const successfulRequest = isThereError(response);
    successfulRequest && dispatch(removeNote(id));

    loadingHandler(false);
  };

  const state = {
    loading,
    notes: notesState,
    displayState: {
      error,
      loadingInitialState,
    },
  };

  const handlers = {
    restoreProcess,
    removeProcess,
  };

  return { state, handlers };
};
