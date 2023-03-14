interface Checkbox {
  note: string;
  id: string;
}

export interface NoteObj extends Checkbox {
  title: string;
  color: string;
  checkbox: boolean;
  createCheckboxes: boolean;
  checked?: Checkbox[];
  unChecked?: Checkbox[];
  labels: string[];
}
