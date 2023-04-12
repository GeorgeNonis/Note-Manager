import { NoteObj } from "../../../../../interfaces/interfaces";

export interface NoteProps {
  note: NoteObj;
  zindex: number;
  position: number;
}

export interface CustomHook extends Pick<NoteProps, "note" | "zindex"> {}
