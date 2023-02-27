import { NoteDetailsProps } from "./interfaces";

const NoteDetails = ({ noteRef, note, editable }: NoteDetailsProps) => {
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

export default NoteDetails;
