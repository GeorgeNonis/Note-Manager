import { NoNotesTitleProps } from "./interfaces";
import { BiNotepad } from "react-icons/bi";
import styles from "./styles.module.scss";

const NoNotesMsg = ({ state }: NoNotesTitleProps) => {
  return (
    <>
      {state.notes.length === 0 && state.pinnedNotes.length === 0 && (
        <div className={styles.noNotesDiv}>
          <BiNotepad />
          <h3 className={styles.noNotesTitle}>No Existing Notes</h3>
        </div>
      )}
    </>
  );
};
export default NoNotesMsg;
