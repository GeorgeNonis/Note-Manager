import { NoteDetailsProps } from "./interfaces";
import { Checkbox } from "../../index";

const NoteDetails = ({
  noteRef,
  note,
  editable,
  checkbox,
  pinned,
}: NoteDetailsProps) => {
  return (
    <p
      style={{ overflowWrap: `${editable ? "unset" : "anywhere"}` }}
      ref={noteRef}
      contentEditable={editable ? "true" : "false"}
      spellCheck="true"
      aria-multiline="true"
      suppressContentEditableWarning
    >
      {/* {note} */}
      {!checkbox && note.note}
      {checkbox &&
        note.unChecked?.length! > 0 &&
        note.unChecked!.map((info) => {
          return (
            <Checkbox
              id={note.id}
              checkBoxDetails={info}
              checked={false}
              key={info.id}
              pinned={pinned}
            />
          );
        })}

      {checkbox &&
        note.checked?.length! > 0 &&
        note.checked!.map((info) => {
          return (
            <Checkbox
              id={note.id}
              checkBoxDetails={info}
              checked={true}
              key={info.id}
              pinned={pinned}
            />
          );
        })}
    </p>
  );
};

export default NoteDetails;
