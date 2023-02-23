import { useEffect, RefObject, MutableRefObject, useRef } from "react";
import { deleteNoteHttp, sortNotesHttp } from "../api/api";
import { InitialState } from "../store/notesSlice";

export const onDropBin = async (
  e: React.DragEvent,
  cb: (id: string, pinned: boolean) => void
) => {
  const id = e.dataTransfer.getData("id");
  const pinned = e.dataTransfer.getData("pinned") === "false" ? false : true;
  if (id.length === 0) return;
  if (window.confirm("Are you sure you wanna delete this note?")) {
    await deleteNoteHttp(id, pinned);
    cb(id, pinned);
  }
};

export function useStateRef<T>(value: T): RefObject<T> {
  const ref: MutableRefObject<T> = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}

interface DragEndProps {
  indexOf: number;
  index: number;
  state: InitialState;
  cb: ([]: any) => void;
  pinned: boolean;
  /**
   * Doesnt work idk
   */
  // cb: ([]: Iterable<NoteObj>[]) => void;
}

export const DragEndUtil = async ({
  indexOf,
  index,
  state,
  cb,
  pinned,
}: DragEndProps) => {
  const notesPrevState = !pinned ? [...state.notes] : [...state.pinnedNotes];
  const note = notesPrevState.find((n, i) => i === indexOf);

  notesPrevState.splice(indexOf, 1);
  const rest = notesPrevState.splice(index);

  indexOf !== 0 ? rest.unshift(note!) : rest.splice(0, 0, note!);
  const response = await sortNotesHttp([...notesPrevState, ...rest], pinned);
  const [res, error] = response;
  if (error) {
    cb(error);
  } else {
    cb([...notesPrevState, ...rest]);
  }
};
