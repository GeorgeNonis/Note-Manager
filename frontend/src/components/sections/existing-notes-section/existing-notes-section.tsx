import { LoadingSpinner, Form } from "../../index";
import Wrapper from "./wrapper";
import { useExistingNotesSection } from "./useExistingNotesSection";
import styles from "./styles.module.scss";
import NoNotesMsg from "../ui/noNotesMsg";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store";
import Section from "../section/section";

const ExistinNotesSection = () => {
  const { useStore } = useExistingNotesSection();
  const {
    notes: { notes, pinnedNotes },
  } = useSelector((state: IRootState) => state);
  if (useStore.values.loading) return <LoadingSpinner />;
  return (
    <Wrapper styles={styles}>
      <main
        className={styles.mainSection}
        ref={useStore.values.clickOutsideNote}
      >
        <Form key={100} useStore={useStore} />
      </main>
      <section className={styles.allNotes}>
        <Section
          pinnedNotes={false}
          dragable={true}
          notes={notes}
          header={pinnedNotes.length !== 0 ? "Others" : undefined}
        />
        <Section dragable={true} notes={pinnedNotes} header="Pinned" />
        <NoNotesMsg state={useStore.values.state} />
      </section>
    </Wrapper>
  );
};

export default ExistinNotesSection;
