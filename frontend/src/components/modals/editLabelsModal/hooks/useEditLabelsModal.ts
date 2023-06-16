import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { addLabel } from "../../../../store/notes-slice";
import { Dispatch, useEffect, useRef, useState } from "react";
import { addLabelHttp } from "../../../../services";
import { isThereError } from "../../../../utils/utils";
import { fetchingDataHandler } from "../../../../store/display-state-slice";

export const useEditLabelsModal = (
  cb: Dispatch<React.SetStateAction<boolean>>
) => {
  const token = sessionStorage.getItem("auth-token")!;
  const labels = useSelector((state: IRootState) => {
    return state.notes.labels;
  });
  const [label, setLabel] = useState("");
  const [createLabel, setCreateLabel] = useState(false);
  const newLabelRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const onClickCreateLabelInputHandler = () => {
    setCreateLabel(false);
  };

  const createLabelHandler = async (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    dispatch(fetchingDataHandler());
    if (e.currentTarget.id === "x&plus") {
      setCreateLabel(!createLabel);
      return createLabel && newLabelRef.current?.focus();
    }
    setCreateLabel(!createLabel);
    if (label.length === 0 || labels.some((l) => l.label === label)) return;
    const sharedId = uuidv4();
    const response = await addLabelHttp({ label, labelId: sharedId, token });
    const sucessfullRequest = isThereError(response);
    sucessfullRequest && dispatch(addLabel({ label, labelId: sharedId }));
    // : dispatch(errorState(response[1]?.message));

    setLabel("");
    dispatch(fetchingDataHandler());
  };

  const state = {
    values: {
      label,
      labels,
      createLabel,
      newLabelRef,
    },
    actions: {
      createLabelHandler,
      onClickCreateLabelInputHandler,
      setCreateLabel,
      setLabel,
    },
  };

  useEffect(() => {
    newLabelRef.current?.focus();
  }, []);

  return {
    state,
  };
};
