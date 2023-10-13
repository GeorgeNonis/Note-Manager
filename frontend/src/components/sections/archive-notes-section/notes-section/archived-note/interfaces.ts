import { NoteObj } from "../../../../../interfaces/interfaces";

export interface NoteProps {
  note: NoteObj;
  position: number;
}

export interface CustomHook extends Pick<NoteProps, "note"> {}
