import { EmptyTrash, DeletedNote } from "../../index";
import { useDeletedNotesSection } from "./useDeletedNotesSection";
import styles from "./styles.module.scss";

const DeletedNotesSection = () => {
  const { state } = useDeletedNotesSection();

  let zindex = 1000;

  if (state.error) return <p className={styles.error}>{state.error}</p>;
  return (
    <>
      <main>
        <h3 className={styles.warning}>
          Notes in Trash are deleted after 7 days.
        </h3>
        <section className={styles.notes}>
          {state.deletedNotes.length === 0 ? (
            <EmptyTrash />
          ) : (
            state.deletedNotes.map((note, i) => {
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
