import { Labels } from "../../../services/interfaces";
export interface LabelModalProps {
  modalState: boolean;
  labelModalHandler: () => void;
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
