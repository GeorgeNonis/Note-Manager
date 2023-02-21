import {
  useCallback,
  useEffect,
  RefObject,
  MutableRefObject,
  useRef,
} from "react";
import { deleteNoteHttp, sortDataHttp } from "../api/api";
import { Notes } from "../interfaces/interfaces";
import { InitialState } from "../store/notesSlice";
/**
 * Practising Typescript
 */
interface Props {
  review: boolean;
  note: Notes;
}

export const colorLogic = ({ review, note }: Props) => {
  if (review) {
    return note.color === "transparent" ? "#242424" : note.color;
  }
  return note.color;
};

export const onDropBin = (
  e: React.DragEvent,
  cb: (id: string, pinned: boolean) => void
) => {
  const id = e.dataTransfer.getData("id");
  const pinned = e.dataTransfer.getData("pinned") === "false" ? false : true;
  if (id.length === 0) return;
  if (window.confirm("Are you sure you wanna delete this note?")) {
    // dispatch(deleteN({ id, pinned }));
    cb(id, pinned);
    deleteNoteHttp(id, pinned);
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
  // cb: ([]) => void;
  indexOf: number;
  index: number;
  state: InitialState;
}

export const DragEndUtil = async ({ indexOf, index, state }: DragEndProps) => {
  const notesPrevState = [...state.notes];
  if (indexOf) {
    const note = notesPrevState.find((n, i) => i === indexOf);
    notesPrevState.splice(indexOf, 1);
    const rest = notesPrevState.splice(index);
    rest.unshift(note!);
    await sortDataHttp([...notesPrevState, ...rest], true);

    return [...notesPrevState, ...rest];
  }
};
