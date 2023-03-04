import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLabelHttp, tickLabelHandlerHttp } from "../../../../../services";
import { tickHandler } from "../../../../../store/notesSlice";
import { IRootState } from "../../../../../store/store";
import { isThereError } from "../../../../../utils/utils";
import { AddLabelProps, Labels } from "./interfaces";
import styles from "./styles.module.scss";

export const useAddLabel = ({ id, pinned }: AddLabelProps) => {
  const labels = useSelector((state: IRootState) => state.notes.labels);
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  // const [labels, setLabels] = useState<Labels[]>([]);
  const addLabelHandler = async () => {
    const response = await addLabelHttp({ id, pinned, label: value });
    console.log(response);
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

  const handlers = {
    isLabelChecked,
    tickLabelHandler,
    addLabelHandler,
  };

  return {
    doesLabelExist,
    value,
    setValue,
    handlers,
    labels,
  };
};
