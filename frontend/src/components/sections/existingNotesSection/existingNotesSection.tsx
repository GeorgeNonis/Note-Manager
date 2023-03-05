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
// import styles from "../../../styles/App.module.scss";

const ExistinNotesSection = () => {
  const {
    loading,
    display,
    note,
    title,
    state,
    setDisplay,
    onDragEnd,
    onDragStart,
    onDragEnter,
    onChangeTitle,
    onChangeNote,
    clickOutsideNote,
  } = useExistingNotesSection();

  let zIndex = 10000;

  if (loading) return <LoadingSpinner />;

  if (state.error) return <ErrorFetching errorMessage={state.error} />;

  const pinnedNotes = state.pinnedNotes.length !== 0 && (
    <PinnedNotesSection notes={[...state.pinnedNotes]} dragable={true} />
  );
  return (
    <Wrapper styles={styles}>
      <main className={styles.mainSection} ref={clickOutsideNote}>
        <Form
          display={display}
          note={note}
          noteStlye={formBorders({ styles, display })}
          onChangeNote={onChangeNote}
          onChangeTitle={onChangeTitle}
          setDisplay={setDisplay}
          title={title}
          key={100}
        />
      </main>
      <section className={styles.allNotes}>
        {pinnedNotes}
        <OthersTitle state={state} />
        <NoNotesTitle state={state} />
        <section className={styles.notes}>
          {!loading &&
            state.notes.length !== 0 &&
            state.notes.map((note, i) => {
              zIndex -= 1;
              return (
                <Note
                  dragable={true}
                  pinned={false}
                  zindex={zIndex}
                  note={note}
                  key={i}
                  position={i}
                  onDragEnd={onDragEnd}
                  onDragEnter={onDragEnter}
                  onDragStart={onDragStart}
                />
              );
            })}
        </section>
      </section>
    </Wrapper>
  );
};

export default ExistinNotesSection;
