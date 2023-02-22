export interface NoteObj {
  title: string;
  note: string;
  id: string;
  color: string;
}

export interface NoteProps {
  note: NoteObj;
  zindex: number;
  position: number;
  pinned: boolean;
  onDragEnd: () => void;
  onDragEnter: (e: React.DragEvent, position: number) => void;
  onDragStart: (
    e: React.DragEvent,
    position: number,
    pinned: boolean,
    id: string
  ) => void;
}

export interface EditNoteArgs {
  noteId: string;
  pinned: boolean;
  titleValue: string | undefined;
  noteValue: string | undefined;
}
