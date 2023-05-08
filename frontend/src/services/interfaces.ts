interface StandartProps {
  noteId: string;
  boxid: string;
  checked: boolean;
  pinned: boolean;
  archived?: boolean;
  label: string;
  labelId: string;
  id: string;
  token: string;
}

export interface CopyNoteProps
  extends Pick<StandartProps, "noteId" | "pinned" | "archived" | "token"> {
  sharedId: string;
}

export interface AddLabelHttpProp
  extends Pick<StandartProps, "label" | "labelId" | "archived" | "token"> {
  id?: string;
  pinned?: boolean;
}

interface Note {
  id: string;
  checked: boolean;
}

export interface Labels
  extends Pick<StandartProps, "label" | "labelId" | "archived" | "token"> {
  notes: Note[];
}

export interface EditNoteArgs
  extends Pick<StandartProps, "noteId" | "pinned" | "archived" | "token"> {
  noteValue?: string;
  titleValue?: string;
}

export interface CheckBoxesProps
  extends Pick<StandartProps, "noteId" | "pinned" | "archived" | "token"> {
  uncheckednote: {
    note: string;
    id: string;
  }[];
}

export interface CheckBoxProps
  extends Pick<
    StandartProps,
    "noteId" | "pinned" | "archived" | "boxid" | "checked" | "token"
  > {}

export interface ArchiveNoteProps
  extends Pick<StandartProps, "noteId" | "pinned" | "archived" | "token"> {}

export interface UserDetailsProps extends Pick<StandartProps, "token"> {
  email: string;
  pwd: string;
}
export interface UserAvatarProps extends Pick<StandartProps, "token"> {
  avatar: string;
}
export interface UserPasswordProps extends Pick<StandartProps, "token"> {
  password: string;
  token: string;
}
