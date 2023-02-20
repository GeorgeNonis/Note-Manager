import { useCallback, useEffect, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { addDataHttp, getDataHttp, sortDataHttp } from "../api/api";
import { IRootState } from "../store/store";
import { useDnd } from "../hooks/useDnD";
import { add, initial, sortNotes, errorState } from "../store/notesSlice";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "./loadingSpinner";
import Note from "./note";
import Inputs from "./form";
import PinnedSection from "./pinnedSection";
import styles from "../styles/App.module.scss";

/**
 * Comes native with React
 */
// import { v4 as uuid } from "uuid";

export interface Notes {
  title: string;
  note: string;
  id: string;
  color: string;
}

const Notes = () => {
  const [loading, setLoading] = useState(true);
  const state = useSelector((state: IRootState) => state.notes);
  const dispatch = useDispatch();
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
    const notesPrevState = [...state.notes];
    if (indexOf) {
      const note = notesPrevState.find((n, i) => i === indexOf);
      notesPrevState.splice(indexOf, 1);
      const rest = notesPrevState.splice(index);
      rest.unshift(note!);
      sortDataHttp([...notesPrevState, ...rest], true);
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
      await getDataHttp()
        .then((data) => {
          console.log(data);
          dispatch(initial(data));
        })
        .catch((error) => {
          console.log(error);
          console.log(error.message);
          dispatch(errorState(error.message));
        });
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
      color: "transparent",
    };
    tempNote.title = title;
    tempNote.note = note;
    // tempNote.id = uuid();
    tempNote.id = crypto.randomUUID();

    addDataHttp(tempNote);
    dispatch(add(tempNote));
    setTitle("");
    setNote("");
  }, [display]);

  const noteStlye = `${styles.noteInput} ${
    !display ? styles.noteInput : styles.noteBorders
  }`;

  let zIndex = 10000;
  if (loading) return <LoadingSpinner />;

  if (state.error) return <p className={styles.error}>{state.error}</p>;
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
      <section className={styles.allNotes}>
        {state.pinnedNotes.length !== 0 && (
          <PinnedSection notes={[...state.pinnedNotes]} />
        )}
        {state.pinnedNotes.length > 0 && (
          <p>{state.notes.length !== 0 && "Others"}</p>
        )}
        {state.notes.length === 0 && state.pinnedNotes.length === 0 && (
          <p style={{ textAlign: "center" }}>No notes</p>
        )}
        <section className={styles.notes}>
          {!loading &&
            state.notes.length !== 0 &&
            state.notes.map((note, i) => {
              zIndex -= 1;
              return (
                <Note
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
    </div>
  );
};

export default Notes;
