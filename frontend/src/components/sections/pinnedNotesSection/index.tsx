import Note from "../../notes/existingNote";
import { PinnedNotesSectionProps } from "./interfaces";
import { usePinnedNotesSection } from "./usePinnedNotesSection";
import styles from "./styles.module.scss";

const PinnedNotesSection = ({ notes, dragable }: PinnedNotesSectionProps) => {
  const { onDragEnter, onDragStart, onDragEnd } = usePinnedNotesSection();
  let zIndex = 1000;
  return (
    <main className={styles.content}>
      <p>Pinned</p>
      <div className={styles.notes}>
        {notes.map((n, i) => {
          zIndex -= 1;
          return (
            <Note
              dragable={dragable}
              pinned={true}
              position={i}
              zindex={zIndex}
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
