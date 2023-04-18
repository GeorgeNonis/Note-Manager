interface StandartProps {
  noteId: string;
  boxid: string;
  checked: boolean;
  pinned: boolean;
  archived?: boolean;
  label: string;
  labelId: string;
  id: string;
}

export interface CopyNoteProps
  extends Pick<StandartProps, "noteId" | "pinned" | "archived"> {
  sharedId: string;
}

export interface AddLabelHttpProp
  extends Pick<StandartProps, "label" | "labelId" | "archived"> {
  id?: string;
  pinned?: boolean;
}

interface Note {
  id: string;
  checked: boolean;
}

export interface Labels
  extends Pick<StandartProps, "label" | "labelId" | "archived"> {
  notes: Note[];
}

export interface EditNoteArgs
  extends Pick<StandartProps, "noteId" | "pinned" | "archived"> {
  noteValue?: string;
  titleValue?: string;
}

export interface CheckBoxesProps
  extends Pick<StandartProps, "noteId" | "pinned" | "archived"> {
  uncheckednote: {
    note: string;
    id: string;
  }[];
}

export interface CheckBoxProps
  extends Pick<
    StandartProps,
    "noteId" | "pinned" | "archived" | "boxid" | "checked"
  > {}

export interface ArchiveNoteProps
  extends Pick<StandartProps, "noteId" | "pinned" | "archived"> {}
