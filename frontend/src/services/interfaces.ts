export interface CopyNoteProps {
  noteId: string;
  sharedId: string;
  pinned: boolean;
}

export interface AddLabelHttpProp {
  id: string;
  label: string;
  pinned: boolean;
}

interface Note {
  id: string;
  checked: boolean;
}

export interface Labels {
  label: string;
  notes: Note[];
}

export interface EditNoteArgs {
  noteId: string;
  pinned: boolean;
  noteValue?: string;
  titleValue?: string;
}
