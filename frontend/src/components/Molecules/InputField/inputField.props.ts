export interface InputFieldProps {
  legendText: string;
  errorMessage: string;
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
