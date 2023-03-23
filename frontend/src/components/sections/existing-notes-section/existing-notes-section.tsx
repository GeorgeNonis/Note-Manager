import {
  LoadingSpinner,
  Note,
  Form,
  PinnedNotesSection,
  ErrorFetching,
  NoNotesTitle,
  OthersTitle,
} from "../../index";
import Wrapper from "./wrapper";
import { useExistingNotesSection } from "./useExistingNotesSection";
import styles from "./styles.module.scss";

const ExistinNotesSection = () => {
  const { useStore } = useExistingNotesSection();

  let zIndex = 10000;

  if (useStore.values.loading) return <LoadingSpinner />;

  if (useStore.values.error === "Network Error") return <></>;

  const pinnedNotes = useStore.values.state.pinnedNotes.length !== 0 && (
    <PinnedNotesSection notes={[...useStore.values.state.pinnedNotes!]} />
  );
  const testGamoto = [...useStore.values.state.notes];
  console.log(useStore.values.state.notes);
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
        <section className={styles.notes}>
          {!useStore.values.loading &&
            useStore.values.state.notes.length !== 0 &&
            testGamoto.map((note, i) => {
              zIndex -= 1;
              return (
                <Note
                  position={i}
                  zindex={zIndex}
                  note={note}
                  pinned={false}
                  onDragEnd={useStore.actions.onDragEnd}
                  onDragEnter={useStore.actions.onDragEnter}
                  onDragStart={useStore.actions.onDragStart}
                  key={i}
                />
              );
            })}
        </section>
      </section>
    </Wrapper>
  );
};

export default ExistinNotesSection;
