import axios, { AxiosError, AxiosResponse } from "axios";
import { EditNoteArgs, NoteObj } from "../interfaces/interfaces";

const API_VERSION = `v1/`;
const BASE_URL = `http://localhost:8080/${API_VERSION}`;

/** Reworked the error hanlding  - DONE*/
export const sortNotesHttp = async (data: NoteObj[], pinned: boolean) => {
  try {
    const response = await axios.post(
      `${BASE_URL}notes/sortnotes?isnotepined=${pinned}`,
      data
    );
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

/** Reworked the error hanlding  - DONE*/
export const getNotesHttp = async <T>(): Promise<
  [T | null, AxiosError | null]
> => {
  try {
    const response = await axios.get<T>(`${BASE_URL}notes`);
    return [response.data, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err];
  }
};

/** Reworked the error hanlding  - DONE*/
export const addNoteHttp = async (data: NoteObj) => {
  try {
    const response = await axios.post(`${BASE_URL}notes`, { ...data });
    console.log(response);
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

/** Reworked the error hanlding  - DONE*/
export const deleteNoteHttp = async <T, E>(
  id: string,
  pinned: boolean
): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.delete<T, E>(
      `${BASE_URL}notes/:${id}?isnotepined=${pinned}`
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

/** Reworked the error hanlding  - DONE*/
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

export const pinNoteHandlerHttp = async <T, E>(
  id: string
): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(`${BASE_URL}notes/pinnote/:${id}`);
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const updateNoteColorHttp = async <T, E>(
  color: string,
  id: string,
  pinned: boolean
): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(
      `${BASE_URL}notes/colorupdate/:${id}?isnotepined=${pinned}`,
      {
        color,
      }
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const editNoteHttp = async <T, E>({
  noteId,
  pinned,
  noteValue,
  titleValue,
}: EditNoteArgs): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(
      `${BASE_URL}notes/editnote/:${noteId}?isnotepined=${pinned}`,
      {
        noteValue,
        titleValue,
      }
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};
