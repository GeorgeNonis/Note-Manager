export interface AddLabelProps {
  id: string;
  pinned: boolean;
  // styles: CSSModuleClasses;
}

export interface Note {
  id: string;
  checked: boolean;
}

export interface Labels {
  label: string;
  notes: Note[];
}

export interface CheckBoxProps {
  id: string;
  obj: Labels;
  handlers: {
    isLabelChecked: (
      obj: Labels,
      id: string
    ) => { string: string; style: string };
    tickLabelHandler: (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      label: string,
      id: string
    ) => void;
    addLabelHandler: () => void;
    // checkBoxStyle: (obj: Labels) => string;
  };
}
