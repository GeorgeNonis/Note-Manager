import { InitialState } from "../store/notesSlice";

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
