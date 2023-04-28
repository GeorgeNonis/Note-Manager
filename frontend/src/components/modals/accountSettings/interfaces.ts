import { Dispatch, SetStateAction } from "react";

export interface useAccountSettingsProps {}

export interface AccountSettingsProps {
  closeModal: Dispatch<SetStateAction<boolean>>;
}
