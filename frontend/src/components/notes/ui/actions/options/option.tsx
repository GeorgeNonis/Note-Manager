import { OptionProps } from "./interfaces";
import { StyledOption } from "../../styles";

const Option = ({ children, text, onClick, textStyle }: OptionProps) => {
  return (
    <StyledOption role={"button"} onClick={onClick}>
      {children}
      <h3 className={textStyle}>{text}</h3>
    </StyledOption>
  );
};
export default Option;
