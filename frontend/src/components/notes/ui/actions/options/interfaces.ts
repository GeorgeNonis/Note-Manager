import { NoteObj } from "../../../../../interfaces/interfaces";

export interface OptionsProps {
  note: NoteObj;
  pinned: boolean;
  styles: CSSModuleClasses;
}

export interface UseOptionsProps {
  note: NoteObj;
  pinned: boolean;
  checkbox?: boolean;
  styles: CSSModuleClasses;
}

export interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  text: string;
  onClick?: (e: React.MouseEvent) => void;
  textStyle?: string | undefined;
}
