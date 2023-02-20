import { MutableRefObject } from "react";

interface Props {
  noteRef?: MutableRefObject<HTMLParagraphElement | null>;
  note: string;
  editable?: boolean;
}

export const NoteDetails = ({ noteRef, note, editable }: Props) => {
  return (
    <p
      style={{ overflowWrap: `${editable ? "unset" : "anywhere"}` }}
      ref={noteRef}
      contentEditable={editable ? "true" : "false"}
      spellCheck="true"
      aria-multiline="true"
      suppressContentEditableWarning
    >
      {note}
    </p>
  );
};
