import { InputProps } from "../../Atoms/Input/input.props";

export interface InputFieldProps extends InputProps {
  /** The text to be displayed in the legend. */
  legendText: string;

  /** Message to display when the input does not meet certain criteria. */
  errorMessage: string;

  /** The actual value of the input field. */
  value: string;

  /** Indicates whether the input value is valid or not. */
  isValid: boolean;

  /** Indicates if the input field is currently focused. */
  isFocused: boolean;

  /**
   * Optional. Determines if the content of the input is visible or masked.
   * Used mainly for password fields.
   */
  showContent?: boolean;

  /** Optional. Indicates if the input or associated elements are hovered. */
  isHovered?: boolean;

  /** Reference to the error message paragraph for improved accessibility. */
  errRef: React.RefObject<HTMLParagraphElement>;

  /** Function to set the hovered state. */
  setHovered: (hoverState: boolean) => void;

  /** Function to set the focus state. */
  setFocused: (focusState: boolean) => void;

  /** Function to set the value of the input. */
  setValue: (value: string) => void;

  /** Optional. Function to toggle the visibility of input content. */
  toggleShowContent?: () => void;
}
