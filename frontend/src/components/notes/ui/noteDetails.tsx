import { NoteDetailsProps } from "./interfaces";
import { Checkbox } from "../../index";
import CompleteItems from "./checkbox/completeItems";
import styles from "../note.module.scss";

const NoteDetails = ({
  noteRef,
  note,
  editable,
  checkbox,
  pinned,
}: NoteDetailsProps) => {
  return (
    <div
      className={styles.notedetails}
      style={{ overflowWrap: `${editable ? "unset" : "anywhere"}` }}
      ref={noteRef}
      contentEditable={editable ? "true" : "false"}
      spellCheck="true"
      aria-multiline="true"
      suppressContentEditableWarning
    >
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
              pinned={pinned!}
            />
          );
        })}
      {checkbox && note.checked?.length! > 0 && (
        <CompleteItems
          completedItems={note.checked!}
          id={note.id}
          pinned={pinned!}
        />
      )}
    </div>
  );
};

export default NoteDetails;
