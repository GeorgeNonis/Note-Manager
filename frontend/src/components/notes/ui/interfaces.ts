import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { NoteObj } from "../../../interfaces/interfaces";

export interface NoteDetailsProps {
  editable?: boolean;
  setNotedetails?: Dispatch<SetStateAction<string>>;
  note: NoteObj;
  noteValue: string;
  pinned?: boolean;
  checkbox?: boolean;
}

export interface NotePinProps {
  styles: CSSModuleClasses;
  pinned: boolean;
  pinNoteHandler: (e: React.MouseEvent) => void;
}

export interface NoteTitleProps {
  editable?: boolean;
  setNoteTitle?: Dispatch<SetStateAction<string>>;
  title: string;
}
