export interface CopyNoteProps {
  noteId: string;
  sharedId: string;
  pinned: boolean;
}

export interface AddLabelHttpProp {
  id?: string;
  label: string;
  labelId: string;
  pinned?: boolean;
}

interface Note {
  id: string;
  checked: boolean;
}

export interface Labels {
  label: string;
  labelId: string;
  notes: Note[];
}

export interface EditNoteArgs {
  noteId: string;
  pinned: boolean;
  noteValue?: string;
  titleValue?: string;
}

export interface CheckBoxesProps {
  noteId: string;
  pinned: boolean;
}

export interface CheckBoxProps {
  noteId: string;
  boxid: string;
  checked: boolean;
  pinned: boolean;
}
