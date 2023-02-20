import { deleteNoteHttp } from "../api/api";
import { useEffect, RefObject, MutableRefObject, useRef } from "react";
/**
 * Practising Typescript
 */
interface Props {
  review: boolean;
  note: {
    color: string;
    title: string;
    note: string;
  };
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
