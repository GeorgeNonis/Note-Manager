import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDnd } from "../hooks/useDnD";
import { sortPinnedNotes } from "../store/notesSlice";
import { IRootState } from "../store/store";
import Note from "./note";
import { Notes } from "./notesSection";
import styles from "../styles/pinnedSection.module.scss";

interface Props {
  notes: Notes[];
}

const PinnedSection = ({ notes }: Props) => {
  const pinnedNotes = useSelector(
    (state: IRootState) => state.notes.pinnedNotes
  );
  const { onDragEnter, onDragStart, index, indexOf } = useDnd();
  const dispatch = useDispatch();

  console.log(notes);
  /**
   * Hook to detect outside click from the note's div
   * so you can close it
   */

  const onDragEnd = useCallback(() => {
    const pinnedNotesPrevState = [...pinnedNotes];
    const note = pinnedNotesPrevState.find((n, i) => i === indexOf)!;
    pinnedNotesPrevState.splice(indexOf, 1);
    const rest = pinnedNotesPrevState.splice(index);
    rest.unshift(note!);
    // sortData([...pinnedNotesPrevState, ...rest], true);
    dispatch(sortPinnedNotes([...pinnedNotesPrevState, ...rest]));
  }, [indexOf, index]);
  let zIndex = 1000;
  return (
    <main className={styles.content}>
      <p>Pinned</p>
      <div className={styles.notes}>
        {notes.map((n, i) => {
          zIndex -= 1;
          return (
            <Note
              pinned={true}
              position={i}
              zindex={zIndex}
              note={n}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              onDragStart={onDragStart}
              key={n.id}
            />
          );
        })}
      </div>
    </main>
  );
};
export default PinnedSection;
