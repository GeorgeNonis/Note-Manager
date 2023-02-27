import { AxiosError } from "axios";
import { useEffect, RefObject, MutableRefObject, useRef } from "react";
import { addNoteHttp, deleteNoteHttp, sortNotesHttp } from "../services";
import { ErrorMessages } from "../errors/ErrorMessags";
import { DragEndProps } from "./interfaces";

export const onDropBin = async (
  e: React.DragEvent,
  cb: (id: string, pinned: boolean) => void
) => {
  const id = e.dataTransfer.getData("id");
  const pinned = e.dataTransfer.getData("pinned") === "false" ? false : true;
  console.log(id);
  console.log(pinned);
  if (id.length === 0) return;
  if (window.confirm("Are you sure you wanna delete this note?")) {
    const response = await deleteNoteHttp(id, pinned);
    if (response[1] === null) {
      cb(id, pinned);
    }
  }
};

export function useStateRef<T>(value: T): RefObject<T> {
  const ref: MutableRefObject<T> = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
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
  console.log(response);
  const [, error] = response;
  if (!error === undefined) {
    cb(error);
  } else {
    cb([...notesPrevState, ...rest]);
  }
};

export const isThereError = <
  T extends unknown[] | [unknown[], AxiosError<unknown, any>]
>(
  response: T
) => {
  console.log(response);
  if (response[1] === null) {
    console.log("true");
    return true;
  } else {
    console.log("false");
    return false;
  }
};

export const notePostHandler = async (
  titleValue: string,
  noteValue: string
) => {
  const processedNote = {
    title: "",
    note: "",
    id: "0",
    color: "transparent",
  };
  processedNote.title = titleValue;
  processedNote.note = noteValue;
  processedNote.id = crypto.randomUUID();
  const response = await addNoteHttp(processedNote);
  console.log(processedNote);
  console.log(response);
  const boolean = isThereError(response);

  return { processedNote, boolean };
};

/**
 * Testing vs code extension for Github collab
 */

export const IfNetworkDown = (msg: string): string => {
  if (msg === "Network down") {
    return ErrorMessages.networkdown;
  } else {
    return msg;
  }
};
