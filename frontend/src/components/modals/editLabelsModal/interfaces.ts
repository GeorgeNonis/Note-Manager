import { AnyAction, Dispatch as ReduxDispatch } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";
import { Labels } from "../../../services/interfaces";
export interface Props {
  closeModal: Dispatch<SetStateAction<boolean>>;
}

export interface LabelProps {
  label: string;
  state: {
    values: {
      labels: Labels[];
    };
    actions: {
      dispatch: ReduxDispatch<AnyAction>;
      removeLabelHandler: (label: string) => void;
    };
  };
}
