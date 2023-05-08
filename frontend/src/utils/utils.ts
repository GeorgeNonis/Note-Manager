import { AxiosError } from "axios";
import { useEffect, RefObject, MutableRefObject, useRef } from "react";
import { addNoteHttp, deleteNoteHttp, sortNotesHttp } from "../services";
import { ErrorMessages } from "../errors/error-messages";
import { DragEndProps } from "./interfaces";

export const onDropBin = async (
  e: React.DragEvent,
  cb: (id: string, pinned: boolean) => void,
  token: string
) => {
  const id = e.dataTransfer.getData("id");
  const pinned = e.dataTransfer.getData("pinned") === "false" ? false : true;

  if (id.length === 0) return;
  if (window.confirm("Are you sure you wanna delete this note?")) {
    const response = await deleteNoteHttp(id, pinned, false, token);
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
  token,
}: DragEndProps) => {
  const notesPrevState = !pinned ? [...state.notes] : [...state.pinnedNotes];

  const swapElements = ({ arr, i1, i2 }: any) => {
    // Step 1
    let temp = arr[i1];
    // Step 2
    arr[i1] = arr[i2];
    // Step 3
    arr[i2] = temp;
    return arr;
  };

  const b = swapElements({ arr: notesPrevState, i1: index, i2: indexOf });

  const response = await sortNotesHttp([...b], pinned, token);
  console.log(response);

  const [, error] = response;
  if (!error === undefined) {
    cb(error);
  } else {
    // cb([...notesPrevState, ...rest]);
    cb([...b]);
  }
};

export const isThereError = <
  T extends unknown[] | [unknown[], AxiosError<unknown, any>]
>(
  response: T
) => {
  // console.log(response);
  if (response[1] === null) {
    // console.log("true");
    return true;
  } else {
    // console.log("false");
    return false;
  }
};

export const notePostHandler = async (
  titleValue: string,
  noteValue: string,
  token: string
) => {
  const processedNote = {
    title: "",
    note: "",
    id: "0",
    color: "transparent",
    checkbox: false,
    createCheckboxes: false,
    labels: [],
  };
  processedNote.title = titleValue;
  processedNote.note = noteValue;
  processedNote.id = crypto.randomUUID();
  const response = await addNoteHttp(processedNote, token);
  // console.log(processedNote);
  // console.log(response);
  const boolean = isThereError(response);

  return { processedNote, boolean, response };
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

export const convertImageToBase64 = (
  imgUrl: string,
  callback: (arg: string) => void
) => {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;
    ctx.drawImage(image, 0, 0);
    const dataUrl = canvas.toDataURL();
    callback && callback(dataUrl);
  };
  image.src = imgUrl;
};
