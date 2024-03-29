import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IfNetworkDown, isThereError, onDropBin } from "../../utils";
import { initial } from "../../store/notes-slice";
import { IRootState } from "../../store/store";
import { getNotesHttp } from "../../services";
import {
  errorState,
  loadingInitialState,
} from "../../store/display-state-slice";
import { useLocation } from "react-router-dom";
import { useLogoutHandler } from "../../hooks/useLogoutHandler";

export const useRootLayout = () => {
  const displayState = useSelector((state: IRootState) => state.displayState);
  const { logoutHandler } = useLogoutHandler();

  const dispatch = useDispatch();

  const location = useLocation();
  const labels = useSelector((state: IRootState) => state.notes.labels);
  const [editLabelsModal, setEditLabelsModal] = useState<boolean>(false);

  const labelModalHandler = () => {
    setEditLabelsModal(!editLabelsModal);
  };

  const state = {
    labels,
    values: { editLabelsModal, displayState },
    actions: {
      labelModalHandler,
    },
  };

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    if (!token) return;
    const parseJwt = (test: string) => {
      try {
        return JSON.parse(atob(test.split(".")[1]));
      } catch (e) {
        return null;
      }
    };
    if (parseJwt(token) === null) {
      return logoutHandler();
    }

    if (parseJwt(token!).exp * 1000 < Date.now()) {
      logoutHandler();
    }
  }, [location]);

  useEffect(() => {
    const initialFetch = async () => {
      const response = await getNotesHttp();

      const sucessfullRequest = isThereError(response);
      if (sucessfullRequest) {
        dispatch(initial(response[0]?.data));
      } else {
        const msg = response[1]?.message!;
        if (response[1]?.status === 401) {
          return logoutHandler();
        }
        dispatch(errorState(IfNetworkDown(msg)));
      }

      dispatch(loadingInitialState(false));
    };
    initialFetch();
  }, []);

  return {
    state,
  };
};
