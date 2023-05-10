import { useArchiveNotesSection } from "./useArchiveNotesSection";
import * as Comp from "../../index";
import Wrapper from "./wrapper";
import styles from "./style.module.scss";

const ArchiveNotesSection = () => {
  const { useStore } = useArchiveNotesSection();
  const {
    values: { archivedNotes },
  } = useStore;

  if (useStore.values.loading) return <Comp.LoadingSpinner />;

  // if (useStore.values.error === "Network Error") return <></>;

  const notes = !useStore.values.loading && archivedNotes.length !== 0 && (
    <Comp.ArchivedNotesSection notes={[...archivedNotes]} />
  );

  return (
    <Wrapper styles={styles}>
      <section className={styles.allNotes}>
        {/* <NoArchievedNotesMsg /> */}
        {archivedNotes.length > 0 ? notes : <Comp.NoArchievedNotesMsg />}
      </section>
    </Wrapper>
  );
};

export default ArchiveNotesSection;
