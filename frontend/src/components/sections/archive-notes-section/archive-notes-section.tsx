import styles from "./style.module.scss";
import { useArchiveNotesSection } from "./useArchiveNotesSection";

import { LoadingSpinner } from "../../index";
import Wrapper from "./wrapper";
import ArchivedNotesSection from "./notes-section/archived-notes-section";

const ArchiveNotesSection = () => {
  const { useStore } = useArchiveNotesSection();
  const {
    values: { archivedNotes },
  } = useStore;

  if (useStore.values.loading) return <LoadingSpinner />;

  if (useStore.values.error === "Network Error") return <></>;

  const notes = !useStore.values.loading && archivedNotes.length !== 0 && (
    <ArchivedNotesSection notes={[...archivedNotes]} />
  );

  return (
    <Wrapper styles={styles}>
      <section className={styles.allNotes}>{notes}</section>
    </Wrapper>
  );
};

export default ArchiveNotesSection;
