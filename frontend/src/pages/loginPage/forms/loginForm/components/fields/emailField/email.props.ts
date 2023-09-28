export interface EmailFieldProps {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setEmailFocus: React.Dispatch<React.SetStateAction<boolean>>;
  emailRef: React.RefObject<HTMLInputElement>;
}
