import { NoteObj } from "../../../interfaces/interfaces";

export interface NoteProps {
  note: NoteObj;
  zindex: number;
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

export interface CustomHook {
  pinned: boolean;
  note: NoteObj;
  zindex: number;
}
