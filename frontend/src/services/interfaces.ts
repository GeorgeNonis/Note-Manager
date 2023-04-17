interface StandartProps {
  noteId: string;
  boxid: string;
  checked: boolean;
  pinned: boolean;
  archive?: boolean;
  label: string;
  labelId: string;
  id: string;
}

export interface CopyNoteProps
  extends Pick<StandartProps, "noteId" | "pinned" | "archive"> {
  sharedId: string;
}

export interface AddLabelHttpProp
  extends Pick<StandartProps, "label" | "labelId" | "archive"> {
  id?: string;
  pinned?: boolean;
}

interface Note {
  id: string;
  checked: boolean;
}

export interface Labels
  extends Pick<StandartProps, "label" | "labelId" | "archive"> {
  notes: Note[];
}

export interface EditNoteArgs
  extends Pick<StandartProps, "noteId" | "pinned" | "archive"> {
  noteValue?: string;
  titleValue?: string;
}

export interface CheckBoxesProps
  extends Pick<StandartProps, "noteId" | "pinned" | "archive"> {
  uncheckednote: {
    note: string;
    id: string;
  }[];
}

export interface CheckBoxProps
  extends Pick<
    StandartProps,
    "noteId" | "pinned" | "archive" | "boxid" | "checked"
  > {}
