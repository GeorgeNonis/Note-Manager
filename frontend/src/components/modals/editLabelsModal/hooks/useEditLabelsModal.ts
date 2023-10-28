import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { addLabel } from "../../../../store/notes-slice";
import { useEffect, useRef, useState } from "react";
import { addLabelHttp } from "../../../../services";
import { isThereError } from "../../../../utils/utils";
import { fetchingDataHandler } from "../../../../store/display-state-slice";

export const useEditLabelsModal = () => {
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

  const loadingHandler = () => {
    dispatch(fetchingDataHandler());
  };

  const isNotValid =
    label.length === 0 || labels.some((l) => l.label === label);

  const createLabelHandler = async (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    loadingHandler();

    if (e.currentTarget.id === "x&plus" && !isNotValid) {
      setCreateLabel(!createLabel);
      createLabel && newLabelRef.current?.focus();
    } else if (!isNotValid) {
      setCreateLabel(!createLabel);
      const sharedId = uuidv4();
      const response = await addLabelHttp({ label, labelId: sharedId, token });
      const successfulRequest = isThereError(response);
      successfulRequest && dispatch(addLabel({ label, labelId: sharedId }));

      setLabel("");
    }
    loadingHandler();
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
