import { InputTextProps } from "./interfaces";

const Input = (props: InputTextProps) => {
  return (
    <input
      {...props}
      contentEditable="true"
      spellCheck="true"
      aria-multiline="true"
      role={"textbox"}
    />
  );
};

export default Input;
