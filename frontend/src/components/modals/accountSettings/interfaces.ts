import { Dispatch, SetStateAction } from "react";

export interface useAccountSettingsProps {}

export interface AccountSettingsProps {
  // closeModal: Dispatch<SetStateAction<boolean>>;
}

export interface NavLinkProps {
  onClick: Dispatch<SetStateAction<string>>;
  active: string;
  text: string;
  styles: CSSModuleClasses;
}
