import { useCallback, useEffect, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { addNoteHttp, getNotesHttp, sortNotesHttp } from "../../api/api";
import { IRootState } from "../../store/store";
import { useDnd } from "../../hooks/useDnD";
import { add, initial, sortNotes, errorState } from "../../store/notesSlice";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../uiComponents/loadingSpinner";
import Note from "../notes/note";
import Form from "../formComponents/form";
import PinnedSection from "./pinnedSection";
import styles from "../styles/App.module.scss";

/**
 * Comes native with React
 */
// import { v4 as uuid } from "uuid";

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

  // const onDragEnd = () => {
  //   console.log("Dragging");
  //   const sortedArray = DragEndUtil({ state, index, indexOf });
  //   dispatch(sortNotes(sortedArray));
  // };
  const onDragEnd = useCallback(() => {
    console.log(indexOf);
    const notesPrevState = [...state.notes];
    if (indexOf) {
      const note = notesPrevState.find((n, i) => i === indexOf)!;
      notesPrevState.splice(indexOf, 1);
      const rest = notesPrevState.splice(index);
      rest.unshift(note);
      sortNotesHttp([...notesPrevState, ...rest], true);
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
      await getNotesHttp()
        .then((data) => {
          setLoading(false);
          dispatch(initial(data));
        })
        .catch((error) => {
          dispatch(errorState(error.message));
        });
    };
    fetch();
  }, []);

  useEffect(() => {
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

    addNoteHttp(tempNote);
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

  const pinnedNotes = state.pinnedNotes.length !== 0 && (
    <PinnedSection notes={[...state.pinnedNotes]} />
  );

  const othersPara = state.pinnedNotes.length > 0 && (
    <p>{state.notes.length !== 0 && "Others"}</p>
  );

  const noNotes = state.notes.length === 0 &&
    state.pinnedNotes.length === 0 && (
      <p style={{ textAlign: "center" }}>No notes</p>
    );
  return (
    <div className={styles.content}>
      <h3 className={styles.title}>Your Note's</h3>
      <main className={styles.mainSection} ref={outside}>
        <Form
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
        {pinnedNotes}
        {othersPara}
        {noNotes}
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
