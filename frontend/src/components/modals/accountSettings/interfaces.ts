import { Dispatch, SetStateAction } from "react";

export interface useAccountSettingsProps {}

export interface AccountSettingsProps {
  open: boolean;
}

export interface NavLinkProps {
  onClick: Dispatch<SetStateAction<string>>;
  active: string;
  text: string;
}
