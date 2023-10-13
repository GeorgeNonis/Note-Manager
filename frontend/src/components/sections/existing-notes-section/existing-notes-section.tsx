import { LoadingSpinner, Form, Grid } from "../../index";
import { useExistingNotesSection } from "./useExistingNotesSection";
import styles from "./styles.module.scss";
import Section from "../section/section";
import NoNotes from "../ui/noNotes";
import { BiNotepad } from "react-icons/bi";

const ExistinNotesSection = () => {
  const { useStore } = useExistingNotesSection();
  const { pinnedNotes, notes } = useStore.values.state;

  const isThereAnyNotes = pinnedNotes.length === 0 && notes.length === 0;
  if (useStore.values.loading) return <LoadingSpinner />;
  return (
    <Grid>
      <main
        className={styles.mainSection}
        ref={useStore.values.clickOutsideNote}
      >
        <Form key={100} useStore={useStore} />
      </main>
      <section className={styles.allNotes}>
        <Section dragable={true} notes={pinnedNotes} header="Pinned" />
        <Section
          pinnedNotes={false}
          dragable={true}
          notes={notes}
          header={pinnedNotes.length !== 0 ? "Others" : undefined}
        />
        {isThereAnyNotes && (
          <NoNotes SVG={BiNotepad} children={"No Existing Notes"} />
        )}
      </section>
    </Grid>
  );
};

export default ExistinNotesSection;
