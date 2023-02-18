import { useCallback, useEffect, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { addData, getData, sortData } from "../api/api";
import { IRootState } from "../store/store";
import { useDnd } from "../hooks/useDnD";
import { add, initial, sortNotes } from "../store/notesSlice";
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-uuid";
import LoadingSpinner from "./loadingSpinner";
import Note from "./note";
import Inputs from "./form";
import styles from "../styles/App.module.scss";
import PinnedSection from "./pinnedSection";

export interface Notes {
  title: string;
  note: string;
  id: string;
  pinned: boolean;
}

const Notes = () => {
  const [loading, setLoading] = useState(true);
  const { notes } = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  // const [blur, setBlur] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  /**
   *
   * Drag and Drop hook with states and functions
   */
  const { onDragEnter, onDragStart, index, indexOf } = useDnd();

  /**
   * Hook to detect outside click from the note's div
   * so you can close it
   */
  const outside = useOutsideClick(() => {
    setDisplay(false);
  });

  const onDragEnd = useCallback(() => {
    const notesPrevState = [...notes.notes];
    if (indexOf) {
      const note = notesPrevState.find((n, i) => i === indexOf);
      notesPrevState.splice(indexOf, 1);
      const rest = notesPrevState.splice(index);
      rest.unshift(note!);
      sortData([...notesPrevState, ...rest], true);
      dispatch(sortNotes([...notesPrevState, ...rest]));
    }
  }, [indexOf, index]);

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setTitle(e.target.value);
    },
    []
  );
  const onChangeNote = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const data = await getData();
      dispatch(initial(data));
    };
    if (loading) {
      fetch();
      setLoading(false);
      return;
    }

    if (note.length === 0 && title.length === 0) return;
    /**
     * Storing the details of note with id so in the state
     * and in backend are the same info
     */
    const tempNote = {
      title: "",
      note: "",
      id: "0",
    };
    tempNote.title = title;
    tempNote.note = note;
    tempNote.id = uuid();

    addData(tempNote);
    dispatch(add(tempNote));
    setTitle("");
    setNote("");
  }, [display]);

  const noteStlye = `${styles.noteInput} ${
    !display ? styles.noteInput : styles.noteBorders
  }`;

  let zIndex = 10000;

  return (
    <div className={styles.content}>
      <h3 className={styles.title}>Your Note's</h3>
      <main className={styles.mainSection} ref={outside}>
        <Inputs
          display={display}
          note={note}
          noteStlye={noteStlye}
          onChangeNote={onChangeNote}
          onChangeTitle={onChangeTitle}
          setDisplay={setDisplay}
          title={title}
          key={100}
        />
      </main>
      <section className={styles.notes}>
        {loading && <LoadingSpinner />}
        {notes.notes.some((n) => n.pinned) && (
          <PinnedSection notes={[...notes.notes.filter((n) => n.pinned)]} />
        )}
        {notes.notes.length === 0 && !loading ? (
          <p style={{ textAlign: "center", gridColumn: 3 }}>No notes</p>
        ) : (
          !loading &&
          notes.notes.map((note, i) => {
            zIndex -= 1;
            return (
              <Note
                zindex={zIndex}
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
    </div>
  );
};

export default Notes;
