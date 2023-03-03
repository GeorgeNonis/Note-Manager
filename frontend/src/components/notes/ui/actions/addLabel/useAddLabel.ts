import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { addLabelHttp } from "../../../../../services";
import { tickLabelHandlerHttp } from "../../../../../services/editNote";
import { getLabelsHttp } from "../../../../../services/getNote";
import { isThereError } from "../../../../../utils/utils";
import { AddLabelProps, Note, Labels } from "./interfaces";
import styles from "./styles.module.scss";

export const useAddLabel = ({ id, pinned }: AddLabelProps) => {
  const [value, setValue] = useState<string>("");
  const [labels, setLabels] = useState<Labels[]>([]);
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
    console.log(e.currentTarget.ariaChecked);
    e.currentTarget.ariaChecked === "true"
      ? (e.currentTarget.ariaChecked = "false")
      : (e.currentTarget.ariaChecked = "true");
    console.log("clicking");
    const response = await tickLabelHandlerHttp(id, label);
    // const result = str === "true" ? "false" : "true";
    // return result;
  };

  const handlers = {
    isLabelChecked,
    tickLabelHandler,
    addLabelHandler,
  };

  useEffect(() => {
    const getLabels = async () => {
      const response = await getLabelsHttp();
      const labels = response[0]!;
      setLabels(labels);
    };
    getLabels();
  }, []);
  return {
    doesLabelExist,
    value,
    setValue,
    handlers,
    labels,
  };
};
