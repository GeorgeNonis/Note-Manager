import {
  LoadingSpinner,
  Form,
  PinnedNotesSection,
  OthersTitle,
} from "../../index";
import Wrapper from "./wrapper";
import { useExistingNotesSection } from "./useExistingNotesSection";
import NotesSection from "./notes-section/notes-section";
import styles from "./styles.module.scss";
import NoNotesMsg from "../ui/noNotesMsg";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store";

const ExistinNotesSection = () => {
  const { useStore } = useExistingNotesSection();
  const {
    notes: { notes: existingnotes },
  } = useSelector((state: IRootState) => state);
  if (useStore.values.loading)
    return <LoadingSpinner open={useStore.values.loading} />;

  const pinnedNotes = useStore.values.state.pinnedNotes.length !== 0 && (
    <PinnedNotesSection notes={[...useStore.values.state.pinnedNotes!]} />
  );
  const notes = useStore.values.state.notes.length !== 0 && (
    <NotesSection notes={[...existingnotes]} />
  );

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
        <NoNotesMsg state={useStore.values.state} />
        {notes}
      </section>
    </Wrapper>
  );
};

export default ExistinNotesSection;
