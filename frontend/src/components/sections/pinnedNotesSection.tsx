import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDnd } from "../../hooks/useDnD";
import { sortPinnedNotes } from "../../store/notesSlice";
import { IRootState } from "../../store/store";
import { NoteObj } from "../../interfaces/interfaces";
import { sortNotesHttp } from "../../api/api";
import Note from "../notes/note";
import styles from "../../styles/pinnedSection.module.scss";
import { DragEndUtil } from "../../utils/utils";

interface Props {
  notes: NoteObj[];
}

const PinnedSection = ({ notes }: Props) => {
  const state = useSelector((state: IRootState) => state.notes);
  const { onDragEnter, onDragStart, index, indexOf } = useDnd();
  const dispatch = useDispatch();

  /**
   * Hook to detect outside click from the note's div
   * so you can close it
   */
  const onDragEnd = async () => {
    const cb = (arr: Iterable<NoteObj>[]) => {
      dispatch(sortPinnedNotes(arr));
    };
    await DragEndUtil({ state, index, indexOf, cb, pinned: true });
  };
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
