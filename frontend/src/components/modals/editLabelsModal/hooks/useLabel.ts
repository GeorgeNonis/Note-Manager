import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useOutsideHover } from "../../../../hooks";
import { deleteLabelHttp } from "../../../../services";
import { editLabelHttp } from "../../../../services/";
import { deleteLabel, editLabel } from "../../../../store/notes-slice";
import { isThereError } from "../../../../utils";

export const useLabel = (label: string) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [newLabel, setNewLabel] = useState("");
  const [deleteConfig, setDeleteConfig] = useState(false);
  const [mouseOverLabel, setMouseOverLabel] = useState(false);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const hoverOutsideLabel = useOutsideHover(() => setMouseOverLabel(false));

  const deleteLabelHandler = async () => {
    const response = await deleteLabelHttp(label);
    const sucessfullRequest = isThereError(response);
    if (sucessfullRequest) {
      params.labelId?.split(":")[1] && navigate("/notes");
      dispatch(deleteLabel(label));
    } else {
      console.log(response[1]);
    }
  };

  const OnEditHandler = async () => {
    if (!edit) {
      return setEdit(!edit);
    }
    console.log(`${label} ${newLabel}`);
    if (label === newLabel || newLabel.length === 0) return;

    const response = await editLabelHttp(label, newLabel);

    const sucessfullRequest = isThereError(response);

    if (sucessfullRequest) {
      dispatch(editLabel({ label, newLabel }));
    }
    console.log(response[1]?.message);
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
