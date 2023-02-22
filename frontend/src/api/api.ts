import axios from "axios";
import { EditNoteArgs, NoteObj } from "../interfaces/interfaces";

const API_VERSION = `v1/`;
const BASE_URL = `http://localhost:8080/${API_VERSION}`;

// export const sortNotesHttp = async (data: NoteObj[], pinned: boolean) => {
//   await axios
//     .post(`${BASE_URL}notes/sortnotes?isnotepined=${pinned}`, data)
//     .then((res) => {
//       console.log(res);
//       return res;
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };

export const sortNotesHttp = async (data: NoteObj[], pinned: boolean) => {
  const response = await axios.post(
    `${BASE_URL}notes/sortnotes?isnotepined=${pinned}`,
    data
  );
  console.log(response);
};

export const getNotesHttp = async (): Promise<NoteObj[]> => {
  return axios
    .get<NoteObj[]>(`${BASE_URL}notes`)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.response.data.message);
    });
};

export const addNoteHttp = async (data: NoteObj) => {
  await axios
    .post(`${BASE_URL}notes`, { ...data })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      return err;
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
