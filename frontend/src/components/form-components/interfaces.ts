export interface FormProps {
  display: boolean;
  // noteStlye: string;
  onChangeNote: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  note: string;
  setDisplay: (arg: boolean) => void;
  title: string;
}

export interface InputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onClick?: () => void;
  // className: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
