import axios, { AxiosError } from "axios";
import { NoteObj } from "../interfaces/interfaces";
import { BASE_URL } from "../config";
import {
  CopyNoteProps,
  CheckBoxProps,
  CheckBoxesProps,
  ArchiveNoteProps,
  UserDetailsProps,
} from "./interfaces";

export const createUserHttp = async <T, E>(
  email: string,
  pwd: string,
  image: string
): Promise<[T | E | null, AxiosError | null]> => {
  console.log("Creating User");
  console.log({ email, pwd });
  console.log(`${BASE_URL}signup`);
  try {
    const response = await axios.post<T, E>(`${BASE_URL}signup`, {
      email,
      pwd,
      image,
    });
    // console.log(response);
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const getUserHttp = async <T, E>({
  email,
  pwd,
}: UserDetailsProps): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(
      `${BASE_URL}login`,
      { email, pwd },
      {
        headers: {
          user: email,
        },
      }
    );
    console.log("Login");
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};
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
  archived,
}: CopyNoteProps): Promise<[T | E | null, AxiosError | null]> => {
  // console.log(noteId);
  try {
    const response = await axios.post<T, E>(
      `${BASE_URL}notes/copynote/:${noteId}?isnotepined=${pinned}&isarchived=${archived}`,
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
  archived,
}: CheckBoxesProps): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(
      `${BASE_URL}notes/checkboxes/:${noteId}?isnotepined=${pinned}&isarchived=${archived}`,
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
  archived,
  boxid,
  checked,
}: CheckBoxProps): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(
      `${BASE_URL}notes/checkbox/:${noteId}?isnotepined=${pinned}&isarchived=${archived}`,
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

export const archiveNoteHandlerHttp = async <T, E>({
  noteId,
  pinned,
  archived,
}: ArchiveNoteProps): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(
      `${BASE_URL}notes/${
        !archived ? "archivenote" : "unarchivenote"
      }/:${noteId}?isnotepined=${pinned}`
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};
