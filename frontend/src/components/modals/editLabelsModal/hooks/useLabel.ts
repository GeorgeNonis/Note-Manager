import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useOutsideHover } from "../../../../hooks";
import { deleteLabelHttp } from "../../../../services";
import { editLabelHttp } from "../../../../services/";
import {
  errorState,
  fetchingDataHandler,
} from "../../../../store/display-state-slice";
import { deleteLabel, editLabel } from "../../../../store/notes-slice";
import { isThereError } from "../../../../utils";

export const useLabel = (label: string) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("auth-token")!;
  const params = useParams();
  const dispatch = useDispatch();
  const [newLabel, setNewLabel] = useState("");
  const [deleteConfig, setDeleteConfig] = useState(false);
  const [mouseOverLabel, setMouseOverLabel] = useState(false);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const hoverOutsideLabel = useOutsideHover(() => setMouseOverLabel(false));

  const deleteLabelHandler = async () => {
    dispatch(fetchingDataHandler());
    const response = await deleteLabelHttp(label, token);
    const sucessfullRequest = isThereError(response);
    if (sucessfullRequest) {
      params.labelId?.split(":")[1] && navigate("/notes");
      dispatch(deleteLabel(label));
    } else {
      // dispatch(errorState(response[1]?.message));
    }
    dispatch(fetchingDataHandler());
  };

  const OnEditHandler = async () => {
    if (!edit) {
      return setEdit(!edit);
    }
    if (label === newLabel || newLabel.length === 0) return;

    dispatch(fetchingDataHandler());
    const response = await editLabelHttp(label, newLabel, token);

    const sucessfullRequest = isThereError(response);

    if (sucessfullRequest) {
      dispatch(editLabel({ label, newLabel }));
    } else {
      // dispatch(errorState(response[1]?.message));
    }
    dispatch(fetchingDataHandler());
  };

  const state = {
    values: {
      mouseOverLabel,
      edit,
      hoverOutsideLabel,
      deleteConfig,
      inputRef,
      newLabel,
    },
    actions: {
      setMouseOverLabel,
      setEdit,
      setDeleteConfig,
      setNewLabel,
      deleteLabelHandler,
      OnEditHandler,
    },
  };

  useEffect(() => {
    !edit ? undefined : inputRef.current?.focus();
  }, [edit]);
  return {
    state,
  };
};
