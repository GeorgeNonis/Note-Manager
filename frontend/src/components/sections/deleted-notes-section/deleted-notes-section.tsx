import { EmptyTrash, DeletedNote } from "../../index";
import { useDeletedNotesSection } from "./useDeletedNotesSection";
import styles from "./styles.module.scss";

const DeletedNotesSection = () => {
  const { state } = useDeletedNotesSection();

  let zindex = 1000;

  // if (state.displayState.error)
  //   return <p className={styles.error}>{state.displayState.error}</p>;
  return (
    <>
      <main>
        <h3 className={styles.warning}>
          Notes in Trash are deleted after 7 days.
        </h3>
        <section className={styles.notes}>
          {state.notes.deletedNotes.length === 0 &&
          !state.displayState.loadingInitialState ? (
            <EmptyTrash />
          ) : (
            state.notes.deletedNotes.map((note, i) => {
              zindex -= 1;
              return <DeletedNote zindex={zindex} note={note} key={i} />;
            })
          )}
        </section>
      </main>
    </>
  );
};

export default DeletedNotesSection;
