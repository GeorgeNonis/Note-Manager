import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onClick?: () => void;
  className: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input = (props: Props) => {
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
