import { Dispatch } from "react";

export interface Props {
  state: {
    actions: {
      deleteLabelHandler: () => Promise<void>;
      setDeleteConfig: Dispatch<React.SetStateAction<boolean>>;
    };
  };
}

export interface DiscardBoxesProps {
  transitionState: string;
  checkboxhandler: (e: React.MouseEvent<HTMLElement>) => void;
  closeModal: () => void;
}
