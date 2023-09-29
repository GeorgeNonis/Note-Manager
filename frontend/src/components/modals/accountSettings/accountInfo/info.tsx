import { InfoProps } from "./accountInfo.props";

const Info = ({ name, type = "date", value }: InfoProps) => {
  return (
    <fieldset>
      <legend>{name}</legend>
      <input type={type} value={value} readOnly />
    </fieldset>
  );
};
export default Info;
