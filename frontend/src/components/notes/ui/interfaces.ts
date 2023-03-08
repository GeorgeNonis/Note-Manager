import { MutableRefObject } from "react";
import { NoteObj } from "../../../interfaces/interfaces";

export interface NotePinProps {
  styles: CSSModuleClasses;
  pinned: boolean;
  pinNoteHandler: (e: React.MouseEvent) => void;
}

export interface NoteTitleProps {
  titleRef?: MutableRefObject<HTMLHeadingElement | null> | undefined;
  title: string;
  editable?: boolean;
}

export interface NoteDetailsProps {
  noteRef?: MutableRefObject<HTMLParagraphElement | null>;
  note: NoteObj;
  editable?: boolean;
  pinned?: boolean;
  checkbox?: boolean;
}
