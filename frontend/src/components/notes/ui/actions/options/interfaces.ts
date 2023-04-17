import { NoteObj } from "../../../../../interfaces/interfaces";

export interface OptionsProps {
  archive?: boolean;
  review: boolean;
  note: NoteObj;
  pinned: boolean;
  styles: CSSModuleClasses;
}

export interface UseOptionsProps extends OptionsProps {
  checkbox?: boolean;
}

export interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  text: string;
  onClick?: (e: React.MouseEvent) => void;
  textStyle?: string | undefined;
}
