import { useState, useCallback, useEffect } from "react";
import { sortDataHttp } from "../api/api";
import { IRootState } from "../store/store";
import { useDnd } from "../hooks/useDnD";
import DeletedNote from "./deletedNote";
import LoadingSpinner from "./loadingSpinner";
import EmptyTrash from "./emptyTrash";
import { sortDelNotes } from "../store/notesSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/trashSection.module.scss";

const Deleted = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const deletedNotes = useSelector(
    (state: IRootState) => state.notes.deletedNotes
  );
  const { onDragEnter, onDragStart, index, indexOf } = useDnd();

  const onDragEnd = useCallback(() => {
    const notesPrevState = [...deletedNotes];
    if (indexOf) {
      const note = notesPrevState.find((n, i) => i === indexOf);
      notesPrevState.splice(indexOf, 1);
      const rest = notesPrevState.splice(index);
      rest.unshift(note!);
      sortDataHttp([...notesPrevState, ...rest], false);
      dispatch(sortDelNotes([...notesPrevState, ...rest]));
    }
  }, [indexOf, index]);
  let zindex = 1000;
  return (
    <>
      <main>
        <h3 className={styles.warning}>
          Notes in Trash are deleted after 7 days.
        </h3>
        <section className={styles.notes}>
          {deletedNotes.length === 0 ? (
            <EmptyTrash />
          ) : (
            deletedNotes.map((note, i) => {
              zindex -= 1;
              return (
                <DeletedNote
                  zindex={zindex}
                  note={note}
                  key={i}
                  position={i}
                  onDragEnd={onDragEnd}
                  onDragEnter={onDragEnter}
                  onDragStart={onDragStart}
                />
              );
            })
          )}
        </section>
      </main>
    </>
  );
};

export default Deleted;
