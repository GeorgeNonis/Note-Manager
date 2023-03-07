interface Checkbox {
  note: string;
  id: string;
}

export interface NoteObj {
  title: string;
  note: string;
  id: string;
  color: string;
  checkbox: boolean;
  createCheckboxes: boolean;
  checked?: Checkbox[];
  unChecked?: Checkbox[];
  labels: string[];
}
