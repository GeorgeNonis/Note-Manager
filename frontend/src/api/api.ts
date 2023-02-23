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
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

export const deleteNoteHttp = async (
  id: string,
  pinned: boolean
): Promise<void> => {
  await axios
    .delete(`${BASE_URL}notes/:${id}?isnotepined=${pinned}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const restoreNoteHttp = async (id: string) => {
  console.log(id);
  return await axios
    .post(`${BASE_URL}trashbin/:${id}`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const removeNoteHttp = async (id: string) => {
  await axios
    .post(`${BASE_URL}trashbin`, { id })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const pinNoteHandlerHttp = async (id: string) => {
  await axios
    .post(`${BASE_URL}notes/pinnote/:${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const updateNoteColorHttp = async (
  color: string,
  id: string,
  pinned: boolean
) => {
  await axios
    .post(`${BASE_URL}notes/colorupdate/:${id}?isnotepined=${pinned}`, {
      color,
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const editNoteHttp = async ({
  noteId,
  pinned,
  noteValue,
  titleValue,
}: EditNoteArgs) => {
  await axios
    .post(`${BASE_URL}notes/editnote/:${noteId}?isnotepined=${pinned}`, {
      noteValue,
      titleValue,
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
