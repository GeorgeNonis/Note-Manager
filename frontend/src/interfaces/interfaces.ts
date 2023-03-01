export interface NoteObj {
  title: string;
  note: string;
  id: string;
  color: string;
  labels: string[];
}

export interface EditNoteArgs {
  noteId: string;
  pinned: boolean;
  noteValue?: string;
  titleValue?: string;
}
