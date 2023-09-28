import { StyledComponentProps } from "../../Atoms/Button/button.props";
import { StyledForm } from "./form.styles";

export type StyledFormProps = StyledComponentProps<typeof StyledForm>;

export interface FormProps extends StyledFormProps {
  children: React.ReactNode;
}
