import { InputProps } from "../../Atoms/Input/input.props";

export interface InputFieldProps extends InputProps {
  legendText: string;
  errorMessage: string;
  value: string;
  isValid: boolean;
  isFocused: boolean;
  showContent?: boolean;
  isHovered?: boolean;
  errRef: React.RefObject<HTMLParagraphElement>;
  setHovered: (hoverState: boolean) => void;
  setFocused: (focusState: boolean) => void;
  setValue: (value: string) => void;
  toggleShowContent?: () => void;
}
