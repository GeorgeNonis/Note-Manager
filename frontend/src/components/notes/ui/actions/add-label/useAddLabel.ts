import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLabelHttp, tickLabelHandlerHttp } from "../../../../../services";
import { addLabel, tickHandler } from "../../../../../store/notes-slice";
import { IRootState } from "../../../../../store/store";
import { isThereError } from "../../../../../utils/utils";
import { AddLabelProps, Labels } from "./interfaces";
import styles from "./styles.module.scss";

export const useAddLabel = ({ id, pinned }: AddLabelProps) => {
  const labels = useSelector((state: IRootState) => state.notes.labels);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const addLabelHandler = async () => {
    if (value.length === 0) return;
    if (labels.find((l) => l.label === value)) return;
    const sharedId = crypto.randomUUID();
    const response = await addLabelHttp({
      id,
      pinned,
      label: value,
      labelId: sharedId,
    });
    const sucessfullRequest = isThereError(response);
    sucessfullRequest
      ? dispatch(addLabel({ id, pinned, label: value, labelId: sharedId }))
      : console.log(response[1]);
    setValue("");
  };

  const doesLabelExist = labels.find((lb) => lb.label === value);

  const isLabelChecked = (label: Labels, id: string) => {
    const isItChecked = label.notes.find((l) => l.id === id);
    const style = `${isItChecked?.checked ? styles.checked : styles.unChecked}`;

    const string = isItChecked ? "true" : "false";
    return {
      string,
      style,
    };
  };

  const tickLabelHandler = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    label: string,
    id: string
  ) => {
    const response = await tickLabelHandlerHttp(id, label, pinned);
    const sucessfullRequest = isThereError(response);

    if (sucessfullRequest) {
      dispatch(tickHandler({ id, label }));
    } else {
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const state = {
    actions: {
      isLabelChecked,
      tickLabelHandler,
      addLabelHandler,
      setValue,
    },
    values: {
      value,
      doesLabelExist,
      labels,
      inputRef,
    },
  };

  return {
    state,
  };
};
