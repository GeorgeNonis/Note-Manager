interface StandartProps {
  noteId: string;
  boxid: string;
  checked: boolean;
  pinned: boolean;
  label: string;
  labelId: string;
  id: string;
}

export interface CopyNoteProps
  extends Pick<StandartProps, "noteId" | "pinned"> {
  sharedId: string;
}

export interface AddLabelHttpProp
  extends Pick<StandartProps, "label" | "labelId"> {
  id?: string;
  pinned?: boolean;
}

interface Note {
  id: string;
  checked: boolean;
}

export interface Labels extends Pick<StandartProps, "label" | "labelId"> {
  notes: Note[];
}

export interface EditNoteArgs extends Pick<StandartProps, "noteId" | "pinned"> {
  noteValue?: string;
  titleValue?: string;
}

export interface CheckBoxesProps
  extends Pick<StandartProps, "noteId" | "pinned"> {}

export interface CheckBoxProps
  extends Pick<StandartProps, "noteId" | "pinned" | "boxid" | "checked"> {}
