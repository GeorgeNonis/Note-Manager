import {
  LoadingSpinner,
  Note,
  PinnedNotesSection,
  ErrorFetching,
  NoNotesTitle,
  OthersTitle,
} from "../../index";
import { useNotesWithLabelsSection } from "./useNotesWithLabelsSection";
import { useParams } from "react-router-dom";
import Wrapper from "./wrapper";
import styles from "./styles.module.scss";

const NotesWithLabelsSection = () => {
  const params = useParams();
  const label = params.label!;
  const { loading, state, dummys, pnNotes, unNotes } =
    useNotesWithLabelsSection({ label });

  let zIndex = 10000;

  if (loading) return <LoadingSpinner />;

  if (state.error) return <ErrorFetching errorMessage={state.error} />;

  const pinnedNotes = pnNotes.length !== 0 && (
    <PinnedNotesSection notes={[...pnNotes]} dragable={false} />
  );
  return (
    <Wrapper styles={styles}>
      <section className={styles.allNotes}>
        {pinnedNotes}
        <OthersTitle state={state} />
        <NoNotesTitle state={state} />
        <section className={styles.notes}>
          {!loading &&
            unNotes.length !== 0 &&
            unNotes.map((note, i) => {
              zIndex -= 1;
              return (
                <Note
                  dragable={false}
                  pinned={false}
                  zindex={zIndex}
                  note={note}
                  key={i}
                  position={i}
                  onDragEnd={dummys}
                  onDragEnter={dummys}
                  onDragStart={dummys}
                />
              );
            })}
        </section>
      </section>
    </Wrapper>
  );
};

export default NotesWithLabelsSection;
