import axios, { AxiosError } from "axios";
import { NoteObj } from "../interfaces/interfaces";
import { BASE_URL } from "../config";
import { CopyNoteProps, CheckBoxProps, CheckBoxesProps } from "./interfaces";

export const addNoteHttp = async <T, E>(
  data: NoteObj
): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(`${BASE_URL}notes`, { ...data });
    // console.log(response);
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const pinNoteHandlerHttp = async <T, E>(
  id: string,
  pinned: boolean
): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(
      `${BASE_URL}notes/pinnote/:${id}?isnotepined=${pinned}`
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const removeNoteHttp = async <T, E>(
  id: string
): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(`${BASE_URL}trashbin`, { id });
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const restoreNoteHttp = async <T, E>(
  id: string
): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(`${BASE_URL}trashbin/:${id}`);
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const copyNoteHttp = async <T, E>({
  noteId,
  sharedId,
  pinned,
  archive,
}: CopyNoteProps): Promise<[T | E | null, AxiosError | null]> => {
  // console.log(noteId);
  try {
    const response = await axios.post<T, E>(
      `${BASE_URL}notes/copynote/:${noteId}?isnotepined=${pinned}&isarchived=${archive}`,
      { sharedId }
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const checkBoxesHandlerHttp = async <T, E>({
  noteId,
  pinned,
  uncheckednote,
  archive,
}: CheckBoxesProps): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(
      `${BASE_URL}notes/checkboxes/:${noteId}?isnotepined=${pinned}&isarchived=${archive}`,
      { uncheckednote }
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const checkBoxHandlerHttp = async <T, E>({
  noteId,
  pinned,
  archive,
  boxid,
  checked,
}: CheckBoxProps): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(
      `${BASE_URL}notes/checkbox/:${noteId}?isnotepined=${pinned}&isarchived=${archive}`,
      {
        boxid,
        checked,
      }
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};
