import { IRootState } from "../../store/store";
import { useSelector } from "react-redux";
import EmptyTrash from "../ui/emptyTrash";
import DeletedNote from "../notes/deletedNote";
import styles from "../../styles/trashSection.module.scss";

const Deleted = () => {
  const state = useSelector((state: IRootState) => state.notes);

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

export default Deleted;
