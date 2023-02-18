import axios from "axios";

interface Notes {
  title: string;
  note: string;
  id: string;
}

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
      return res.data;
    })
    .catch((err) => {
      return err;
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
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
