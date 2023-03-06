import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { addLabel } from "../../../../store/notesSlice";
import { Dispatch, useEffect, useRef, useState } from "react";
import { addLabelHttp } from "../../../../services";
import { isThereError } from "../../../../utils/utils";

export const useEditLabelsModal = (
  cb: Dispatch<React.SetStateAction<boolean>>
) => {
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
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.currentTarget.id === "x&plus") {
      setCreateLabel(!createLabel);
      return createLabel && newLabelRef.current?.focus();
    }
    setCreateLabel(!createLabel);
    if (label.length === 0 || labels.some((l) => l.label === label)) return;
    const sharedId = crypto.randomUUID();
    const response = await addLabelHttp({ label, labelId: sharedId });
    const sucessfullRequest = isThereError(response);
    sucessfullRequest
      ? dispatch(addLabel({ label, labelId: sharedId }))
      : console.log(response[1]);

    setLabel("");
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

  // useEffect(() => {
  //   const keyDownHandler = (event: any) => {
  //     console.log("User pressed: ", event.key);

  //     if (event.key === "Escape") {
  //       event.preventDefault();
  //       cb(false);
  //     }
  //   };
  //   document.addEventListener("keydown", keyDownHandler);
  //   return () => {
  //     document.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, []);

  useEffect(() => {
    newLabelRef.current?.focus();
  }, []);

  return {
    state,
  };
};
