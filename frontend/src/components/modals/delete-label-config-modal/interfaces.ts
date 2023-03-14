import { Dispatch } from "react";

export interface Props {
  state: {
    actions: {
      deleteLabelHandler: () => Promise<void>;
      setDeleteConfig: Dispatch<React.SetStateAction<boolean>>;
    };
  };
}
