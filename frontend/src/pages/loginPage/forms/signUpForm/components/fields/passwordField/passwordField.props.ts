export interface PasswordFieldProps {
  passwordValid: boolean;
  showPassword: boolean;
  password: string;
  passwordHover: boolean;
  passwordFocus: boolean;
  errRef: React.RefObject<HTMLParagraphElement>;
  setPassword: (arg: string) => void;
  setPasswordFocus: (arg: boolean) => void;
  showPasswordHandler: () => void;
}
