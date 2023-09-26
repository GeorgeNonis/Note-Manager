export interface PasswordFieldProps {
  setPasswordFocus: React.Dispatch<React.SetStateAction<boolean>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPasswordHandler: () => void;
  passwordHover: boolean;
  showPassword: boolean;
}
