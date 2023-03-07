export interface CheckBoxProps {
  checked: boolean;
  pinned: boolean;
  id: string;
  checkBoxDetails: {
    note: string;
    id: string;
  };
}
export interface UseCheckBox {
  checked: boolean;
  pinned: boolean;
  noteId: string;
  boxid: string;
}
