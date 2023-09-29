import { InitialState } from "../../store/interfaces";

export interface InputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onClick?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export interface FormProps {
  useStore: {
    values: {
      error: string;
      loading: boolean;
      display: boolean;
      note: string;
      title: string;
      clickOutsideNote: React.MutableRefObject<any>;
      state: InitialState;
    };
    actions: {
      setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
      onDragEnd: (e: React.DragEvent) => Promise<void>;
      onDragStart: (
        e: React.DragEvent<Element>,
        position: number,
        pinned: boolean,
        id: string
      ) => void;
      onDragEnter: (e: React.DragEvent<Element>, position: number) => void;
      onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
      onChangeNote: (e: React.ChangeEvent<HTMLInputElement>) => void;
      clearInputs: () => void;
      saveNote: () => Promise<void>;
    };
  };
}
