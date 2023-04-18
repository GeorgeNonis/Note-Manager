import {
  LoadingSpinner,
  Form,
  PinnedNotesSection,
  NoNotesTitle,
  OthersTitle,
} from "../../index";
import Wrapper from "./wrapper";
import { useExistingNotesSection } from "./useExistingNotesSection";
import NotesSection from "./notes-section/notes-section";
import styles from "./styles.module.scss";

const ExistinNotesSection = () => {
  const { useStore } = useExistingNotesSection();
  // console.log(`useStore.values.state`);
  // console.log(useStore.values.state);

  if (useStore.values.loading) return <LoadingSpinner />;

  if (useStore.values.error === "Network Error") return <></>;

  const pinnedNotes = useStore.values.state.pinnedNotes.length !== 0 && (
    <PinnedNotesSection notes={[...useStore.values.state.pinnedNotes!]} />
  );
  const notes = !useStore.values.loading &&
    useStore.values.state.notes.length !== 0 && (
      <NotesSection notes={[...useStore.values.state.notes]} />
    );

  // console.log(useStore.values.state.notes);
  return (
    <Wrapper styles={styles}>
      <main
        className={styles.mainSection}
        ref={useStore.values.clickOutsideNote}
      >
        <Form key={100} useStore={useStore} />
      </main>
      <section className={styles.allNotes}>
        {pinnedNotes}
        <OthersTitle state={useStore.values.state!} />
        <NoNotesTitle state={useStore.values.state} />
        {notes}
      </section>
    </Wrapper>
  );
};

export default ExistinNotesSection;
