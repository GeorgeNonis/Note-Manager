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
import { useLocation } from "react-router-dom";
import axios from "../../services/axios";
import { useLogoutHandler } from "../../hooks/useLogoutHandler";

export const useRootLayout = () => {
  const displayState = useSelector((state: IRootState) => state.displayState);
  const { logoutHandler } = useLogoutHandler();
  const dispatch = useDispatch();
  const error = "";
  axios.interceptors.request.use(
    (request) => {
      return request;
    },
    (err) => {
      return Promise.reject;
    }
  );

  axios.interceptors.response.use(
    (response) => {
      displayState.error.length > 0 && dispatch(errorState(error));

      return response;
    },
    (err) => {
      const {
        response: { status },
        message,
      } = err;
      if (status == 401) {
        logoutHandler();
      } else if (status === 500) {
        dispatch(errorState(IfNetworkDown(message)));
      } else {
        dispatch(errorState(status.toString()));
      }
      return Promise.reject(err);
    }
  );

  const location = useLocation();
  const labels = useSelector((state: IRootState) => state.notes.labels);
  const [editLabelsModal, setEditLabelsModal] = useState<boolean>(false);
  const [mouseOverTrash, setMouseOverTrash] = useState<boolean>(false);
  const hoverOutsideTrash = useOutsideHover(() => setMouseOverTrash(false));
  const token = sessionStorage.getItem("auth-token")!;
  const onDropHandler = async (e: React.DragEvent) => {
    await onDropBin(
      e,
      (id, pinned) => {
        dispatch(deleteNote({ id, pinned }));
      },
      token
    );
  };

  const labelModalHandler = () => {
    setEditLabelsModal(!editLabelsModal);
  };

  const state = {
    labels,
    values: { mouseOverTrash, editLabelsModal, displayState },
    actions: {
      labelModalHandler,
      setMouseOverTrash,
      onDropHandler,
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
      const response = await getNotesHttp(token!);

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
    hoverOutsideTrash,
    state,
  };
};
