import { RefObject } from "react";

export interface EmailFieldProps {
  emailValid: boolean;
  emailFocus: boolean;
  email: string;
  emailRef: RefObject<HTMLInputElement>;
  setEmail: (arg: string) => void;
  setEmailFocus: (arg: boolean) => void;
}
