import { useNotesSection } from "./useNotesSection";
import { NoteObj } from "../../../../interfaces/interfaces";
import Note from "../../../notes/existing-note/existing-note";
import styles from "./styles.module.scss";

const NotesSection = ({
  notes,
  dragable = true,
}: {
  notes: NoteObj[];
  dragable?: boolean;
}) => {
  const { onDragEnter, onDragStart, onDragEnd } = useNotesSection();
  let zIndex = 1000;
  // console.log(`Inside notes-section before I map`);
  // console.log(notes);
  return (
    <main className={styles.content}>
      <div className={styles.notes} role="divwithnotes">
        {notes.map((n, i) => {
          zIndex -= 1;
          return (
            <Note
              dragable={dragable}
              pinned={false}
              position={i}
              zindex={zIndex}
              note={n}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              onDragStart={onDragStart}
              key={i}
            />
          );
        })}
      </div>
    </main>
  );
};
export default NotesSection;
