import { StyledComponentProps } from "../Button/button.props";
import { StyledInput } from "./input.styles";

export type StyledInputProps = StyledComponentProps<typeof StyledInput>;

export interface InputProps extends StyledInputProps {
  backgroundUnset?: boolean;
}
