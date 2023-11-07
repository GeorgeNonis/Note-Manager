import { AxiosError, AxiosRequestConfig } from "axios";
import axios from "./axios";

import { NoteObj } from "../interfaces/interfaces";
import {
  CopyNoteProps,
  CheckBoxProps,
  CheckBoxesProps,
  ArchiveNoteProps,
  UserDetailsProps,
  UserAvatarProps,
  UserPasswordProps,
  Responseheaders,
} from "./interfaces";
export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

export const createUserHttp = async <T, E>(
  email: string,
  pwd: string,
  image: string
): Promise<[Responseheaders | AxiosResponse | null, AxiosError | null]> => {
  try {
    const response = await axios.post<Responseheaders>(`signup`, {
      email,
      pwd,
      image,
    });

    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const getUserHttp = async <T, E>({
  email,
  pwd,
}: UserDetailsProps): Promise<[AxiosResponse | null, AxiosError | null]> => {
  try {
    const response = await axios.post<AxiosResponse>(`login`, {
      email,
      pwd,
    });
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
    const response = await axios.post<T, E>(`notes`, {
      ...data,
    });
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
      `notes/pinnote/:${id}?isnotepined=${pinned}`,
      { undefined }
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
    const response = await axios.delete<T, E>(`trashbin/:${id}`);
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
    const response = await axios.post<T, E>(`trashbin/:${id}`, { undefined });
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
  try {
    const response = await axios.post<T, E>(
      `notes/copynote/:${noteId}?isnotepined=${pinned}&isarchived=${archived}`,
      {
        sharedId,
      }
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
      `notes/checkboxes/:${noteId}?isnotepined=${pinned}&isarchived=${archived}`,
      {
        uncheckednote,
      }
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
      `notes/checkbox/:${noteId}?isnotepined=${pinned}&isarchived=${archived}`,
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
      `notes/${
        !archived ? "archivenote" : "unarchivenote"
      }/:${noteId}?isnotepined=${pinned}`,
      { undefined }
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const changeAvatarPictureHttp = async <T, E>({
  avatar,
}: UserAvatarProps): Promise<
  [Responseheaders | AxiosResponse | T | E | null, AxiosError | null]
> => {
  try {
    const response = await axios.post<AxiosResponse<T | E>>(`avatar`, {
      avatar,
    });
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};
export const checkPasswordValidity = async ({
  password,
}: UserPasswordProps): Promise<[AxiosResponse | null, AxiosError | null]> => {
  try {
    const response = await axios.post<AxiosResponse>(`pwd`, {
      password,
    });
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};
export const newPasswordHttp = async (
  password: string
): Promise<[AxiosResponse | null, AxiosError | null]> => {
  try {
    const response = await axios.post<AxiosResponse>(`npwd`, {
      password,
    });
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};
