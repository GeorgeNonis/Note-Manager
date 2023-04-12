// import { useNotesSection } from "./useNotesSection";
import { NoteObj } from "../../../../interfaces/interfaces";
import ArchivedNote from "./archived-note";
import styles from "./styles.module.scss";

/**
 * If archived following functionalitys
 * Remove Pinned functionality
 * Remove Add Label
 */

const ArchivedNotesSection = ({ notes }: { notes: NoteObj[] }) => {
  let zIndex = 1000;
  return (
    <main className={styles.content}>
      <div className={styles.notes} role="divwithnotes">
        {notes.map((n, i) => {
          zIndex -= 1;
          return (
            <ArchivedNote position={i} zindex={zIndex} note={n} key={n.id} />
          );
        })}
      </div>
    </main>
  );
};
export default ArchivedNotesSection;
