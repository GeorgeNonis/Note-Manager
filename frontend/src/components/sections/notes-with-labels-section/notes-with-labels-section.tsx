import { useNotesWithLabelsSection } from "./useNotesWithLabelsSection";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import Section from "../section/section";
import NoNotes from "../ui/noNotes";
import { MdOutlineLabel } from "react-icons/md";

const NotesWithLabelsSection = () => {
  const params = useParams();
  const label = params.labelId!;
  const { pnNotes, unNotes } = useNotesWithLabelsSection({
    label,
  });
  return (
    <section className={styles.allNotes}>
      {unNotes.length == 0 && pnNotes.length === 0 && (
        <NoNotes
          SVG={MdOutlineLabel}
          children={"No notes with this label yet"}
        />
      )}
      <Section dragable={true} notes={pnNotes} header="Pinned" />
      <Section
        dragable={true}
        notes={unNotes}
        header={pnNotes.length !== 0 ? "Others" : undefined}
      />
    </section>
  );
};

export default NotesWithLabelsSection;
