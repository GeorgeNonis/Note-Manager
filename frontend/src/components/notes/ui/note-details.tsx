import { NoteDetailsProps } from "./interfaces";
import { Checkbox } from "../../index";
import CompleteItems from "./checkbox/complete-items";
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
      onKeyUp={(e) => console.log(e.currentTarget.innerHTML)}
      style={{ overflowWrap: `${editable ? "unset" : "anywhere"}` }}
      ref={noteRef}
      contentEditable={editable ? "true" : "false"}
      spellCheck="true"
      aria-multiline="true"
      suppressContentEditableWarning
      placeholder={"Empty note"}
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
              pinned={pinned}
            />
          );
        })}
      {checkbox && note.checked?.length! > 0 && (
        <CompleteItems
          completedItems={note.checked!}
          id={note.id}
          pinned={pinned}
        />
      )}
    </div>
  );
};

export default NoteDetails;
