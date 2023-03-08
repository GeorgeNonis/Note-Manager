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
export interface UseCheckBox {
  checked: boolean;
  pinned: boolean;
  noteId: string;
  boxid: string;
}

export interface CompletedItems {
  completedItems: CheckBoxDetails[];
  pinned: boolean;
  id: string;
}
