import axios, { AxiosError, AxiosResponse } from "axios";
import { BASE_URL } from "../config";
import { EditNoteArgs, NoteObj } from "../interfaces/interfaces";

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
