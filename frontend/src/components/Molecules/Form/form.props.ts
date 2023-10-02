import { StyledComponentProps } from "../../Atoms/Button/button.props";
import { StyledForm } from "./form.styles";

export type StyledFormProps = StyledComponentProps<typeof StyledForm>;

export interface FormProps extends StyledFormProps {
  /**
   * React child components to be displayed within the form.
   */
  children: React.ReactNode;
  /**
   * Optional. Determines if the default background and border should be unset.
   */
  backgroundUnset?: boolean;
}
