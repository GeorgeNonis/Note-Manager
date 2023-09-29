import { InputProps } from "./input.props";
import { StyledInput } from "./input.styles";

const Input = ({ backgroundUnset, ...props }: InputProps) => {
  return <StyledInput backgroundUnset={backgroundUnset} required {...props} />;
};
export default Input;
