import { NoteObj } from "../../../interfaces/interfaces";

export interface DeletedNoteProps {
  loading: {
    restoreLoading: boolean;
    removeLoading: boolean;
  };
  note: NoteObj;
  restoreProcess: (
    e: React.MouseEvent<Element, MouseEvent>,
    id: string
  ) => Promise<void>;
  removeProcess: (
    e: React.MouseEvent<Element, MouseEvent>,
    id: string
  ) => Promise<void>;
}
