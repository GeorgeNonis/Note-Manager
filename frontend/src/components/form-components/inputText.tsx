import { InputProps } from "../Atoms/Input/input.props";
import { StyledInput } from "./styles";

const Input = ({ ...props }: InputProps) => {
  return (
    <StyledInput
      backgroundUnset={true}
      contentEditable="true"
      spellCheck="true"
      aria-multiline="true"
      role={"textbox"}
      {...props}
    />
  );
};

export default Input;
