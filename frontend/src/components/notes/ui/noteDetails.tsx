import { NoteDetailsProps } from "./interfaces";

const NoteDetails = ({ noteRef, note, editable }: NoteDetailsProps) => {
  console.log(JSON.stringify(note).split(/\r\n|\r|\n/));
  const findSetences = note.split(/\r\n|\r|\n/).filter((el) => el.length > 0);
  console.log(findSetences);
  console.log(findSetences[2].trim());
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
