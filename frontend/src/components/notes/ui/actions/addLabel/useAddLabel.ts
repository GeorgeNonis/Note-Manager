import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLabelHttp } from "../../../../../services";
import { tickLabelHandlerHttp } from "../../../../../services/editNote";
import { getLabelsHttp } from "../../../../../services/getNote";
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
    console.log("clicking");
    const response = await tickLabelHandlerHttp(id, label, pinned);
    const sucessfullRequest = isThereError(response);

    if (sucessfullRequest) {
      // e.currentTarget.ariaChecked === "true"
      //   ? (e.currentTarget.ariaChecked = "false")
      //   : (e.currentTarget.ariaChecked = "true");
      dispatch(tickHandler({ id, label }));
      console.log(`Sucess`);
    } else {
      console.log("ERROR");
    }
  };

  const handlers = {
    isLabelChecked,
    tickLabelHandler,
    addLabelHandler,
  };

  // useEffect(() => {
  //   const getLabels = async () => {
  //     const response = await getLabelsHttp();
  //     const labels = response[0]!;
  //     setLabels(labels);
  //   };
  //   getLabels();
  // }, []);
  return {
    doesLabelExist,
    value,
    setValue,
    handlers,
    labels,
  };
};
