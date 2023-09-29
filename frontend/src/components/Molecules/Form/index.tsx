import { StyledFormProps } from "./form.props";
import { StyledForm } from "./form.styles";

const Form = ({ children, backgroundUnset, ...props }: StyledFormProps) => {
  return (
    <StyledForm backgroundUnset={backgroundUnset} {...props}>
      {children}
    </StyledForm>
  );
};
export default Form;
