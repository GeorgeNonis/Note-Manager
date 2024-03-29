import { NoteObj } from "../../../../interfaces/interfaces";

export interface ExistingNoteWrapperProps {
  children: React.ReactNode;
  review: boolean;
  note: NoteObj;
  pinned: boolean;
  position: number;
  dragable: boolean;
  onClick: (e: React.MouseEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragEnter: (e: React.DragEvent, position: number) => void;
  onDragStart: (
    e: React.DragEvent,
    position: number,
    pinned: boolean,
    id: string
  ) => void;
}

export interface DeletedNoteWrapperProps
  extends Pick<
    ExistingNoteWrapperProps,
    "children" | "review" | "note" | "onClick"
  > {}
