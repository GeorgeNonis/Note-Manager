import { useState, useCallback, useEffect } from "react";
import { sortDataHttp } from "../api/api";
import { IRootState } from "../store/store";
import { useDnd } from "../hooks/useDnD";
import DeletedNote from "./deletedNote";
import EmptyTrash from "./emptyTrash";
import { sortDelNotes } from "../store/notesSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/trashSection.module.scss";

const Deleted = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: IRootState) => state.notes);
  // console.log(deletedNotes);
  const { onDragEnter, onDragStart, index, indexOf } = useDnd();

  const onDragEnd = useCallback(() => {
    const notesPrevState = [...state.deletedNotes];
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
