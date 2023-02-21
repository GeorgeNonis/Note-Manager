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
}

// export const DragEndUtil = async ({ indexOf, index, state }: DragEndProps) => {
//   const notesPrevState = [...state.notes];
//   if (indexOf) {
//     const note = notesPrevState.find((n, i) => i === indexOf);
//     notesPrevState.splice(indexOf, 1);
//     const rest = notesPrevState.splice(index);
//     rest.unshift(note!);
//     await sortNotesHttp([...notesPrevState, ...rest], true);

//     return [...notesPrevState, ...rest];
//   }
// };
