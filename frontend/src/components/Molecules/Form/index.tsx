import { StyledFormProps } from "./form.props";
import { StyledForm } from "./form.styles";

const Form = ({ children, ...props }: StyledFormProps) => {
  return <StyledForm {...props}>{children}</StyledForm>;
};
export default Form;
