import { NoteObj } from "../../../../interfaces/interfaces";
import ArchivedNote from "./archived-note";
import styles from "./styles.module.scss";

/**
 * If archived following functionalitys
 * Remove Pinned functionality
 */

const ArchivedNotesSection = ({ notes }: { notes: NoteObj[] }) => {
  return (
    <main className={styles.content}>
      <div className={styles.notes} role="divwithnotes">
        {notes.map((n, i) => {
          return <ArchivedNote position={i} note={n} key={n.id} />;
        })}
      </div>
    </main>
  );
};
export default ArchivedNotesSection;
