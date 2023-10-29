import { OptionProps } from "./interfaces";
import { StyledOption } from "../../styles";

const Option = ({ children, text, onClick }: OptionProps) => {
  return (
    <StyledOption role={"button"} onClick={onClick}>
      {children}
      <h3>{text}</h3>
    </StyledOption>
  );
};
export default Option;
