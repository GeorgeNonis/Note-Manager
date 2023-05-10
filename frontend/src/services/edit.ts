import { AxiosError, AxiosResponse } from "axios";
import axios from "./axios";
import { NoteObj } from "../interfaces/interfaces";
import { AddLabelHttpProp, EditNoteArgs } from "./interfaces";

export const sortNotesHttp = async (
  data: NoteObj[],
  pinned: boolean,
  token: string
) => {
  // const token = sessionStorage.getItem("auth-token");

  try {
    const response = await axios.post(
      `notes/sortnotes?isnotepined=${pinned}`,
      {
        data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
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
  archived = false,
  token,
}: EditNoteArgs): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(
      `notes/editnote/:${noteId}?isnotepined=${pinned}&isarchived=${archived}`,
      {
        noteValue,
        titleValue,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
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
  pinned: boolean,
  archived: boolean = false,
  token: string
): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(
      `notes/colorupdate/:${id}?isnotepined=${pinned}&isarchived=${archived}`,
      {
        color,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
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
  archived = false,
  token,
}: AddLabelHttpProp): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(
      `notes/labels/:${id}?isnotepined=${pinned}&isarchived=${archived}`,
      {
        label,
        labelId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
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
  pinned: boolean,
  archived: boolean = false,
  token: string
): Promise<[T | E | null, AxiosError | null]> => {
  // console.log({ id, label, pinned, archived, token });
  try {
    const response = await axios.post<T, E>(
      `notes/label/:${id}?label=${label}&isnotepined=${pinned}&isarchived=${archived}`,
      { undefined },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const editLabelHttp = async <T, E>(
  label: string,
  newLabel: string,
  token: string
): Promise<[T | E | null, AxiosError | null]> => {
  console.log({ label, newLabel, token });
  try {
    const response = await axios.post<T, E>(
      `labels/:${label}`,
      {
        newLabel,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};
