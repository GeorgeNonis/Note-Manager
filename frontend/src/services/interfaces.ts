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

interface Label {
  id: string;
  pinned: boolean;
  checked: boolean;
}

export interface Labels {
  label: string;
  notes: Label[];
}
