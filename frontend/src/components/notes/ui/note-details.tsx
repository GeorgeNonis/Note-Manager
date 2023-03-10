import { NoteDetailsProps } from "./interfaces";
import { Checkbox } from "../../index";
import CompleteItems from "./checkbox/complete-items";
import styles from "../note.module.scss";

const NoteDetails = ({
  noteRef,
  editable,
  setNotedetails,
  note,
  checkbox,
  pinned,
}: NoteDetailsProps) => {
  return (
    <>
      {!checkbox && (
        <textarea
          className={styles.textArea}
          name="notedetails"
          id="notedetails"
          spellCheck="true"
          placeholder="Empty note"
          defaultValue={note.note}
          onChange={(e) => setNotedetails(e.target.value)}
        />
      )}
      <div className={styles.notedetails}>
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
    </>
  );
};

export default NoteDetails;
