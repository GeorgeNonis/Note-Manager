import { Dispatch, SetStateAction } from "react";
import { NoteObj } from "../../../../interfaces/interfaces";

export interface ExistingNoteWrapperProps {
  children: React.ReactNode;
  review: boolean;
  note: NoteObj;
  pinned: boolean;
  position: number;
  zIndex: number;
  dragable: boolean;
  setReview: Dispatch<SetStateAction<boolean>>;
  onDragEnd: () => void;
  onDragEnter: (e: React.DragEvent, position: number) => void;
  onDragStart: (
    e: React.DragEvent,
    position: number,
    pinned: boolean,
    id: string
  ) => void;
  // clickOutsideNote: React.MutableRefObject<any>;
}

export interface DeletedNoteWrapperProps {
  children: React.ReactNode;
  review: boolean;
  note: NoteObj;
  zIndex: number;
  setReview: Dispatch<SetStateAction<boolean>>;
  clickOutsideNote: React.MutableRefObject<any>;
}
