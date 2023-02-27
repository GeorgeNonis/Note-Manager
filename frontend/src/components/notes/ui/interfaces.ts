import { MutableRefObject } from "react";

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
  note: string;
  editable?: boolean;
}
