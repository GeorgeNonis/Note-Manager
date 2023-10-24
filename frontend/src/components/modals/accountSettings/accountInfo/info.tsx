import { Input } from "../../../Atoms";
import { InfoProps } from "./accountInfo.props";
import { StyledFieldSet } from "./accountInfo.styles";

const Info = ({ name, type = "date", value }: InfoProps) => {
  return (
    <StyledFieldSet>
      <legend>{name}</legend>
      <Input type={type} value={value} readOnly />
    </StyledFieldSet>
  );
};
export default Info;
