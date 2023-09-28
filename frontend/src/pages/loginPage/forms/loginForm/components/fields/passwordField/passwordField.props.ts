export interface PasswordFieldProps {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPasswordHandler: () => void;
  passwordHover: boolean;
  showPassword: boolean;
}
