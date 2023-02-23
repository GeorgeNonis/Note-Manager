import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDnd, useOutsideClick } from "../../hooks";
import { getNotesHttp } from "../../api/api";
import { IRootState } from "../../store/store";
import {
  addNote,
  initial,
  errorState,
  sortNotes,
} from "../../store/notesSlice";
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
import { isThereError, notePostHandler } from "../../utils/utils";

const NotesSecion = () => {
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const state = useSelector((state: IRootState) => state.notes);
  const dispatch = useDispatch();

  const { onDragEnter, onDragStart, index, indexOf } = useDnd();

  const clickOutsideNote = useOutsideClick(() => {
    setDisplay(false);
  });

  const onDragEnd = async () => {
    const cb = (arr: Iterable<NoteObj>[]) => {
      console.log(arr);
      dispatch(sortNotes({ arr, pinned: false }));
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
      const response = await getNotesHttp();

      const sucessfullRequest = isThereError(response);
      sucessfullRequest
        ? dispatch(initial(response[0]))
        : dispatch(errorState(response[1]?.message));

      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (note.length === 0 && title.length === 0) return;
    const postNote = async () => {
      const { processedNote, boolean } = await notePostHandler(title, note);
      console.log(boolean);
      boolean ? dispatch(addNote(processedNote)) : console.log("error");

      setTitle("");
      setNote("");
    };
    postNote();
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
