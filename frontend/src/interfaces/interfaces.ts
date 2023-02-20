export interface Notes {
  title: string;
  note: string;
  id: string;
  color: string;
}

export interface NoteProps {
  note: Notes;
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
