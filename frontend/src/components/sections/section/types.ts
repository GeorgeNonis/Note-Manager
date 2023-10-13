import { NoteObj } from "../../../interfaces/interfaces";

export interface SectionProps {
  notes: NoteObj[];
  dragable?: boolean;
  header?: string;
  pinnedNotes?: boolean;
}
