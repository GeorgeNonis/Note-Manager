import { StyledComponentProps } from "../Button/button.props";
import { StyledInput } from "./input.styles";

export type StyledInputProps = StyledComponentProps<typeof StyledInput>;

export interface InputProps extends StyledInputProps {
  /**
   * `Optional` - If set, will override the default background for the input. Default is `$inputShadow`.
   */
  backgroundUnset?: boolean;
}
