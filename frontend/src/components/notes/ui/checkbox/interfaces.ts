interface CheckBoxDetails {
  note: string;
  id: string;
}

export interface CheckBoxProps {
  checked: boolean;
  pinned: boolean;
  id: string;
  checkBoxDetails: CheckBoxDetails;
}
export interface UseCheckBox
  extends Omit<CheckBoxProps, "id" | "checkBoxDetails"> {
  noteId: string;
  boxid: string;
}

export interface CompletedItems
  extends Omit<CheckBoxProps, "checked" | "checkBoxDetails"> {
  completedItems: CheckBoxDetails[];
}
