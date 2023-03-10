import { InitialState } from "../store/interfaces";

export interface DragEndProps {
  indexOf: number;
  index: number;
  state: InitialState;
  cb: ([]: any) => void;
  pinned: boolean;
  /**
   * Doesnt work idk
   */
  // cb: ([]: Iterable<NoteObj>[]) => void;
}
