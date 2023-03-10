import axios, { AxiosError, AxiosResponse } from "axios";
import { BASE_URL } from "../config";
import { NoteObj } from "../interfaces/interfaces";
import { AddLabelHttpProp, EditNoteArgs } from "./interfaces";

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
  console.log(pinned);
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

export const addLabelHttp = async <T, E>({
  label,
  id,
  pinned,
  labelId,
}: AddLabelHttpProp): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(
      `${BASE_URL}notes/labels/:${id}?isnotepined=${pinned}`,
      {
        label,
        labelId,
      }
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const tickLabelHandlerHttp = async <T, E>(
  id: string,
  label: string,
  pinned: boolean
): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(
      `${BASE_URL}notes/label/:${id}?label=${label}&isnotepined=${pinned}`
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const editLabelHttp = async <T, E>(
  label: string,
  newLabel: string
): Promise<[T | E | null, AxiosError | null]> => {
  try {
    // console.log(`Im hitting ${BASE_URL}labels/:${label}`);
    const response = await axios.post<T, E>(`${BASE_URL}labels/:${label}`, {
      newLabel,
    });
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};
