import { NoteTitleProps } from "./interfaces";
import styles from "../note.module.scss";

const NoteTitle = ({
  title,
  setNoteTitle,
  editable = true,
}: NoteTitleProps) => {
  console.log(title);
  return (
    <textarea
      readOnly={editable}
      className={styles.noteTitle}
      name="notedetails"
      id="notedetails"
      spellCheck="true"
      placeholder="Empty note"
      defaultValue={title}
      onChange={(e) => {
        if (setNoteTitle) {
          setNoteTitle(e.target.value);
        }
      }}
    />
  );
};

export default NoteTitle;
