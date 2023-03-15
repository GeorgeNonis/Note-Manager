import { useEffect, useState } from "react";
import { useOutsideHover } from "../../hooks/useOutsideHover";
import { useDispatch, useSelector } from "react-redux";
import { IfNetworkDown, isThereError, onDropBin } from "../../utils";
import { deleteNote, initial } from "../../store/notes-slice";
import { IRootState } from "../../store/store";
import { getNotesHttp } from "../../services";
import {
  errorState,
  loadingInitialState,
} from "../../store/display-state-slice";
import { ErrorMessages } from "../../errors/error-messages";

export const useRootLayout = () => {
  const displayState = useSelector((state: IRootState) => state.displayState);
  const labels = useSelector((state: IRootState) => state.notes.labels);
  const [editLabelsModal, setEditLabelsModal] = useState<boolean>(false);
  const [mouseOverTrash, setMouseOverTrash] = useState<boolean>(false);
  const dispatch = useDispatch();
  const hoverOutsideTrash = useOutsideHover(() => setMouseOverTrash(false));
  const onDropHandler = async (e: React.DragEvent) => {
    await onDropBin(e, (id, pinned) => {
      dispatch(deleteNote({ id, pinned }));
    });
  };

  const networkError = displayState.error === ErrorMessages.networkdown;
  const state = {
    labels,
    values: { mouseOverTrash, editLabelsModal, displayState, networkError },
    actions: {
      setEditLabelsModal,
      setMouseOverTrash,
      onDropHandler,
    },
  };

  useEffect(() => {
    const fetch = async () => {
      // dispatch(errorState(""));
      const response = await getNotesHttp();
      console.log(response);

      const sucessfullRequest = isThereError(response);
      if (sucessfullRequest) {
        dispatch(initial(response[0]));
      } else {
        const msg = response[1]?.message!;
        dispatch(errorState(IfNetworkDown(msg)));
      }

      dispatch(loadingInitialState(false));
    };
    fetch();
  }, []);

  useEffect(() => {
    if (!displayState.error) return;
    if (displayState.error === "Network Error") return;
    // console.log(displayState.error === ErrorMessages.networkdown);
    const timer = setTimeout(() => {
      dispatch(errorState(""));
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [displayState.error]);

  return {
    hoverOutsideTrash,
    state,
  };
};
