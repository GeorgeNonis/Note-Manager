import { NoteObj } from "../../../interfaces/interfaces";

export interface Props {
  loading: boolean;
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
