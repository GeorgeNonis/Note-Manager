import { useNotesSection } from "./useNotesSection";
import { NoteObj } from "../../../../interfaces/interfaces";
import Note from "../../../notes/existing-note/existing-note";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import styles from "./styles.module.scss";

const NotesSection = ({
  dragable = true,
}: {
  notes: NoteObj[];
  dragable?: boolean;
}) => {
  const { onDragEnter, onDragStart, onDragEnd } = useNotesSection();
  const { notes } = useSelector((state: IRootState) => state.notes);
  let zIndex = 1000;

  return (
    <main className={styles.content}>
      <div className={styles.notes}>
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
