import { formBorders } from "../../../utils";
import {
  LoadingSpinner,
  Note,
  Form,
  PinnedNotesSection,
  ErrorFetching,
  NoNotesTitle,
  OthersTitle,
} from "../../index";
import { useExistingNotesSection } from "./useExistingNotesSection";
import Wrapper from "./wrapper";
import styles from "./styles.module.scss";

const ExistinNotesSection = () => {
  const { useStore } = useExistingNotesSection();

  let zIndex = 10000;

  if (useStore.values.loading) return <LoadingSpinner />;

  if (useStore.values.error)
    return <ErrorFetching errorMessage={useStore.values.error} />;

  const pinnedNotes = useStore.values.state.pinnedNotes.length !== 0 && (
    <PinnedNotesSection
      notes={[...useStore.values.state.pinnedNotes]}
      dragable={true}
    />
  );
  const { display } = useStore.values;
  return (
    <Wrapper styles={styles}>
      <main
        className={styles.mainSection}
        ref={useStore.values.clickOutsideNote}
      >
        <Form
          display={useStore.values.display}
          note={useStore.values.note}
          noteStlye={formBorders({ styles, display })}
          onChangeNote={useStore.actions.onChangeNote}
          onChangeTitle={useStore.actions.onChangeTitle}
          setDisplay={useStore.actions.setDisplay}
          title={useStore.values.title}
          key={100}
        />
      </main>
      <section className={styles.allNotes}>
        {pinnedNotes}
        <OthersTitle state={useStore.values.state} />
        <NoNotesTitle state={useStore.values.state} />
        <section className={styles.notes}>
          {!useStore.values.loading &&
            useStore.values.state.notes.length !== 0 &&
            useStore.values.state.notes.map((note, i) => {
              zIndex -= 1;
              return (
                <Note
                  dragable={true}
                  pinned={false}
                  zindex={zIndex}
                  note={note}
                  key={i}
                  position={i}
                  onDragEnd={useStore.actions.onDragEnd}
                  onDragEnter={useStore.actions.onDragEnter}
                  onDragStart={useStore.actions.onDragStart}
                />
              );
            })}
        </section>
      </section>
    </Wrapper>
  );
};

export default ExistinNotesSection;
