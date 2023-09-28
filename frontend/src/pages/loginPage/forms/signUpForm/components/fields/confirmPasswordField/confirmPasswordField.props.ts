export interface ConfirmPasswordFieldProps {
  validMatch: boolean;
  passwordValid: boolean;
  confirmPasswordFocus: boolean;
  showPassword: boolean;
  confirmPasswordHover: boolean;
  errRef: React.RefObject<HTMLParagraphElement>;
  setConfirmPasswordHover: (arg: boolean) => void;
  setConfirmPasswordFocus: (arg: boolean) => void;
  setConfirmPassword: (arg: string) => void;
  showPasswordHandler: () => void;
}
