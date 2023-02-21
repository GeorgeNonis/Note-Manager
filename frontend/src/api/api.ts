import axios from "axios";
import { EditNoteArgs, Notes } from "../interfaces/interfaces";

const BASE_URL = "http://localhost:8080/";

export const sortNotesHttp = async (data: Notes[], pinned: boolean) => {
  await axios
    .post(`${BASE_URL}notes/sortnotes?isnotepined=${pinned}`, data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const getNotesHttp = async (): Promise<Notes[]> => {
  return axios
    .get<Notes[]>(`${BASE_URL}notes`)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.response.data.message);
    });
};

export const addNoteHttp = async (data: Notes) => {
  await axios
    .post(`${BASE_URL}notes/addnote`, { ...data })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
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
    .catch((err) => console.log(err));
};

export const restoreNoteHttp = async (id: string) => {
  console.log(id);
  await axios
    .post(`${BASE_URL}restore`, { id })
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
    .post(`${BASE_URL}remove`, { id })
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
  console.log({ id, color, pinned });
  await axios
    // /notes/:id/colorupdate
    .post(`${BASE_URL}notes/:${id}?isnotepined=${pinned}`, { color })
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
