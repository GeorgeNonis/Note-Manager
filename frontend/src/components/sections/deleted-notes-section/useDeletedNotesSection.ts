import { useState } from "react";
import { IRootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { removeNoteHttp, restoreNoteHttp } from "../../../services";
import { isThereError } from "../../../utils";
import { removeNote, restoreNote } from "../../../store/notes-slice";

export const useDeletedNotesSection = () => {
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("auth-token")!;

  const notesState = useSelector((state: IRootState) => state.notes);
  const { error, loadingInitialState } = useSelector(
    (state: IRootState) => state.displayState
  );

  const restoreProcess = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setRestoreLoading(true);
    const response = await restoreNoteHttp(id, token);
    setRestoreLoading(false);

    const successfulRequest = isThereError(response);
    successfulRequest && dispatch(restoreNote(id));
  };

  const removeProcess = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setRemoveLoading(true);
    const response = await removeNoteHttp(id, token);
    setRemoveLoading(false);

    const successfulRequest = isThereError(response);
    successfulRequest && dispatch(removeNote(id));
  };

  const state = {
    loading: {
      restoreLoading,
      removeLoading,
    },
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
