import { useNotesWithLabelsSection } from "./useNotesWithLabelsSection";
import { useParams } from "react-router-dom";
import NoNotesMsg from "./no-notes-msg";
import styles from "./styles.module.scss";
import Section from "../section/section";

const NotesWithLabelsSection = () => {
  const params = useParams();
  const label = params.labelId!;
  const { state, dummys, pnNotes, unNotes } = useNotesWithLabelsSection({
    label,
  });
  return (
    <section className={styles.allNotes}>
      {unNotes.length == 0 && pnNotes.length === 0 && <NoNotesMsg />}
      <Section
        dragable={true}
        notes={unNotes}
        header={pnNotes.length !== 0 ? "Others" : undefined}
      />
      <Section dragable={true} notes={pnNotes} header="Pinned" />
    </section>
  );
};

export default NotesWithLabelsSection;
