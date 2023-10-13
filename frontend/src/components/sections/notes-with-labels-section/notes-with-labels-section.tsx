import { Note, PinnedNotesSection, OthersTitle } from "../../index";
import { useNotesWithLabelsSection } from "./useNotesWithLabelsSection";
import { useParams } from "react-router-dom";
import NoNotesMsg from "./no-notes-msg";
import styles from "./styles.module.scss";

const NotesWithLabelsSection = () => {
  const params = useParams();
  const label = params.labelId!;
  const { state, dummys, pnNotes, unNotes } = useNotesWithLabelsSection({
    label,
  });

  const pinnedNotes = pnNotes.length !== 0 && (
    <PinnedNotesSection notes={[...pnNotes]} dragable={false} />
  );
  return (
    <section className={styles.allNotes}>
      {pinnedNotes}
      <OthersTitle state={state} />
      <section className={styles.notes}>
        {unNotes.length == 0 && pnNotes.length === 0 && <NoNotesMsg />}
        {unNotes.length !== 0 &&
          unNotes.map((note, i) => {
            return (
              <Note
                dragable={false}
                pinned={false}
                note={note}
                key={i}
                position={i}
                onDragEnd={dummys}
                onDragEnter={dummys}
                onDragStart={dummys}
              />
            );
          })}
      </section>
    </section>
  );
};

export default NotesWithLabelsSection;
