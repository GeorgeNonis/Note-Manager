import { Dispatch, SetStateAction } from "react";

export interface AccountOptionsProps {
  openAccountModal: Dispatch<SetStateAction<boolean>>;
  image: string;
}

export interface UseAccountOptionsProps {
  openAccountModal: Dispatch<SetStateAction<boolean>>;
}
