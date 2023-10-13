import { useArchiveNotesSection } from "./useArchiveNotesSection";
import * as Comp from "../../index";

import styles from "./style.module.scss";

const ArchiveNotesSection = () => {
  const { useStore } = useArchiveNotesSection();
  const {
    values: { archivedNotes },
  } = useStore;

  if (useStore.values.loading) return <Comp.LoadingSpinner />;

  const notes = !useStore.values.loading && archivedNotes.length !== 0 && (
    <Comp.ArchivedNotesSection notes={[...archivedNotes]} />
  );

  return (
    <section className={styles.allNotes}>
      {archivedNotes.length > 0 ? notes : <Comp.NoArchievedNotesMsg />}
    </section>
  );
};

export default ArchiveNotesSection;
