import Note from "../../notes/existing-note";
import { PinnedNotesSectionProps } from "./interfaces";
import { usePinnedNotesSection } from "./usePinnedNotesSection";
import styles from "./styles.module.scss";

const PinnedNotesSection = ({
  notes,
  dragable = true,
}: PinnedNotesSectionProps) => {
  const { onDragEnter, onDragStart, onDragEnd } = usePinnedNotesSection();
  return (
    <main className={styles.content}>
      <p>Pinned</p>
      <div className={styles.notes} role="divwithnotes">
        {notes.map((n, i) => {
          return (
            <Note
              dragable={dragable}
              position={i}
              note={n}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              onDragStart={onDragStart}
              key={n.id}
            />
          );
        })}
      </div>
    </main>
  );
};
export default PinnedNotesSection;
