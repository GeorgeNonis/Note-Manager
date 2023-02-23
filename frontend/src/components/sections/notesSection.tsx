import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDnd, useOutsideClick } from "../../hooks";
import { addNoteHttp, getNotesHttp } from "../../api/api";
import { IRootState } from "../../store/store";
import { addNote, initial, errorState } from "../../store/notesSlice";
import { formBorders, DragEndUtil } from "../../utils";
import { NoteObj } from "../../interfaces/interfaces";
import {
  LoadingSpinner,
  Note,
  Form,
  PinnedSection,
  ErrorFetching,
  NoNotesTitle,
  OthersTitle,
} from "../index";
import styles from "../../styles/App.module.scss";

const NotesSecion = () => {
  const [loading, setLoading] = useState(true);
  const state = useSelector((state: IRootState) => state.notes);
  const dispatch = useDispatch();
  const [display, setDisplay] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const { onDragEnter, onDragStart, index, indexOf } = useDnd();

  const clickOutsideNote = useOutsideClick(() => {
    setDisplay(false);
  });

  const onDragEnd = async () => {
    const cb = (arr: Iterable<NoteObj>[]) => {
      console.log("message" in arr);
      // dispatch(sortNotes({ arr, pinned: false }));
    };
    await DragEndUtil({ state, index, indexOf, cb, pinned: false });
  };

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
      dispatch(errorState(""));
      await getNotesHttp()
        .then((data) => {
          setLoading(false);
          dispatch(initial(data));
        })
        .catch((error) => {
          setLoading(false);
          dispatch(errorState(error.message));
        });
    };
    fetch();
  }, []);

  useEffect(() => {
    if (note.length === 0 && title.length === 0) return;
    const tempNote = {
      title: "",
      note: "",
      id: "0",
      color: "transparent",
    };
    tempNote.title = title;
    tempNote.note = note;
    tempNote.id = crypto.randomUUID();

    addNoteHttp(tempNote);
    dispatch(addNote(tempNote));
    setTitle("");
    setNote("");
  }, [display]);

  let zIndex = 10000;

  if (loading) return <LoadingSpinner />;

  if (state.error) return <ErrorFetching errorMessage={state.error} />;

  const pinnedNotes = state.pinnedNotes.length !== 0 && (
    <PinnedSection notes={[...state.pinnedNotes]} />
  );
  return (
    <div className={styles.content}>
      <h3 className={styles.title}>Your Note's</h3>
      <main className={styles.mainSection} ref={clickOutsideNote}>
        <Form
          display={display}
          note={note}
          noteStlye={formBorders({ styles, display })}
          onChangeNote={onChangeNote}
          onChangeTitle={onChangeTitle}
          setDisplay={setDisplay}
          title={title}
          key={100}
        />
      </main>
      <section className={styles.allNotes}>
        {pinnedNotes}
        <OthersTitle state={state} />
        <NoNotesTitle state={state} />
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

export default NotesSecion;
