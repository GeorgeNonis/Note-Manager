import { NoteObj } from "../../../../../interfaces/interfaces";

export interface OptionsProps {
  archived?: boolean;
  note: NoteObj;
  pinned: boolean;
}

export interface UseOptionsProps extends OptionsProps {
  checkbox?: boolean;
}

export interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  text: string;
  onClick?: (e: React.MouseEvent) => void;
}
