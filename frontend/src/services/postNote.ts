import { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";
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
} from "./interfaces";
export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

type Responseheaders = {
  headers: {
    authorization: string;
  };
};
export const createUserHttp = async <T, E>(
  email: string,
  pwd: string,
  image: string,
  token: string
): Promise<[Responseheaders | AxiosResponse | null, AxiosError | null]> => {
  try {
    const response = await axios.post<Responseheaders>(
      `signup`,
      {
        email,
        pwd,
        image,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
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
}: // token,
UserDetailsProps): Promise<[AxiosResponse | null, AxiosError | null]> => {
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
  data: NoteObj,
  token: string
): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.post<T, E>(
      `notes`,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    // console.log(response);
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const pinNoteHandlerHttp = async <T, E>(
  id: string,
  pinned: boolean,
  token: string
): Promise<[T | E | null, AxiosError | null]> => {
  // const token = sessionStorage.getItem("auth-token");

  try {
    const response = await axios.post<T, E>(
      `notes/pinnote/:${id}?isnotepined=${pinned}`,
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

export const removeNoteHttp = async <T, E>(
  id: string,
  token: string
): Promise<[T | E | null, AxiosError | null]> => {
  // const token = sessionStorage.getItem("auth-token");

  try {
    const response = await axios.post<T, E>(
      `trashbin`,
      {
        id,
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

export const restoreNoteHttp = async <T, E>(
  id: string,
  token: string
): Promise<[T | E | null, AxiosError | null]> => {
  // const token = sessionStorage.getItem("auth-token");

  try {
    const response = await axios.post<T, E>(`trashbin/:${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
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
  token,
}: CopyNoteProps): Promise<[T | E | null, AxiosError | null]> => {
  // const token = sessionStorage.getItem("auth-token");

  try {
    const response = await axios.post<T, E>(
      `notes/copynote/:${noteId}?isnotepined=${pinned}&isarchived=${archived}`,
      {
        sharedId,
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

export const checkBoxesHandlerHttp = async <T, E>({
  noteId,
  pinned,
  uncheckednote,
  archived,
  token,
}: CheckBoxesProps): Promise<[T | E | null, AxiosError | null]> => {
  // const token = sessionStorage.getItem("auth-token");

  try {
    const response = await axios.post<T, E>(
      `notes/checkboxes/:${noteId}?isnotepined=${pinned}&isarchived=${archived}`,
      {
        uncheckednote,
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

export const checkBoxHandlerHttp = async <T, E>({
  noteId,
  pinned,
  archived,
  boxid,
  checked,
  token,
}: CheckBoxProps): Promise<[T | E | null, AxiosError | null]> => {
  // const token = sessionStorage.getItem("auth-token");

  try {
    const response = await axios.post<T, E>(
      `notes/checkbox/:${noteId}?isnotepined=${pinned}&isarchived=${archived}`,
      {
        boxid,
        checked,
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

export const archiveNoteHandlerHttp = async <T, E>({
  noteId,
  pinned,
  archived,
  token,
}: ArchiveNoteProps): Promise<[T | E | null, AxiosError | null]> => {
  // const token = sessionStorage.getItem("auth-token");

  try {
    const response = await axios.post<T, E>(
      `notes/${
        !archived ? "archivenote" : "unarchivenote"
      }/:${noteId}?isnotepined=${pinned}`,
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

export const changeAvatarPictureHttp = async <T, E>({
  avatar,
  token,
}: UserAvatarProps): Promise<
  [Responseheaders | AxiosResponse | T | E | null, AxiosError | null]
> => {
  // const token = sessionStorage.getItem("auth-token");
  console.log({ token });
  try {
    const response = await axios.post<AxiosResponse<T | E>>(
      `avatar`,
      {
        avatar,
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
export const checkPasswordValidity = async ({
  password,
  token,
}: UserPasswordProps): Promise<[AxiosResponse | null, AxiosError | null]> => {
  try {
    const response = await axios.post<AxiosResponse>(
      `pwd`,
      {
        password,
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
export const newPasswordHttp = async (
  password: string,
  token: string
): Promise<[AxiosResponse | null, AxiosError | null]> => {
  try {
    const response = await axios.post<AxiosResponse>(
      `npwd`,
      {
        password,
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
