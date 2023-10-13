import { NoteObj } from "../../../interfaces/interfaces";

export interface NoteProps {
  note: NoteObj;

  position: number;
  pinned?: boolean;
  dragable?: boolean;
  onDragEnd: (e: React.DragEvent) => void;
  onDragEnter: (e: React.DragEvent, position: number) => void;
  onDragStart: (
    e: React.DragEvent,
    position: number,
    pinned: boolean,
    id: string
  ) => void;
}

export interface UseNoteProps extends Pick<NoteProps, "note"> {
  pinned: boolean;
}
