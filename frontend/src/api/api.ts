import axios from "axios";
import { Notes } from "../components/notesSection";

const BASE_URL = "http://localhost:8080/";

export const sortDataHttp = async (data: Notes[], sort: boolean) => {
  await axios
    .post(`${BASE_URL}sort?sort=${sort}`, data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const getDataHttp = async (): Promise<Notes[]> => {
  return axios
    .get<Notes[]>(BASE_URL)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.response.data.message);
    });
};

export const addDataHttp = async (data: Notes) => {
  await axios
    .post("http://localhost:8080/", { ...data })
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
  console.log("Removing");
  await axios
    .delete(`${BASE_URL}:${id}?pinned=${pinned}`)
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
    .post(`${BASE_URL}pin`, { id })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const setColorHttp = async (
  color: string,
  id: string,
  pinned: boolean
) => {
  console.log({ id, color, pinned });
  await axios
    .post(`${BASE_URL}color?pinned=${pinned}`, { id, color })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
