import { Dispatch, SetStateAction } from "react";
import { Labels } from "../../../services/interfaces";
export interface Props {
  transState: string;
  closeModal: Dispatch<SetStateAction<boolean>>;
}

export interface LabelProps {
  label: string;
  state: {
    values: {
      labels: Labels[];
    };
    actions: {};
  };
}
