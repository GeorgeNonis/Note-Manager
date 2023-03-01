import { useState } from "react";
import { addLabelHttp } from "../../../../../services/editNote";
import { AddLabelProps } from "./interfaces";

export const useAddLabel = ({ id, pinned }: AddLabelProps) => {
  const [value, setValue] = useState<string>("");
  const addNoteHandler = async () => {
    const response = await addLabelHttp({ id, pinned, label: value });
    console.log(response);
  };
  return {
    value,
    setValue,
    addNoteHandler,
  };
};
