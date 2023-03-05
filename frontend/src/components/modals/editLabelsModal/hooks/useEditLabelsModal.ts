import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { removeLabel } from "../../../../store/notesSlice";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

export const useEditLabelsModal = () => {
  const [label, setLabel] = useState("");
  const [createLabel, setCreateLabel] = useState(false);
  const newLabelRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const labels = useSelector((state: IRootState) => {
    return state.notes.labels;
  });

  const removeLabelHandler = async (label: string) => {
    dispatch(removeLabel(label));
  };

  // const plusAndxHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   console.log(e.currentTarget.id);
  //   setCreateLabel(!createLabel);
  //   setLabel("");
  //   if (createLabel) newLabelRef.current?.focus();
  // };

  const onClickCreateLabelInputHandler = () => {
    setCreateLabel(false);
  };

  const createLabelHandler = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setCreateLabel(!createLabel);
    setLabel("");
    if (e.currentTarget.id === "x&plus") {
      createLabel && newLabelRef.current?.focus();
    }
  };

  const state = {
    values: {
      label,
      labels,
      createLabel,
      newLabelRef,
    },
    actions: {
      dispatch,
      removeLabelHandler,
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
