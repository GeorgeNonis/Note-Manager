import axios from "axios";

interface Notes {
  title: string;
  note: string;
  id: string;
  pinned: boolean;
}

const BASE_URL = "http://localhost:8080/";

export const sortData = async (data: Notes[], sort: boolean) => {
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

export const getData = async (): Promise<Notes[]> => {
  return axios
    .get<Notes[]>(BASE_URL)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addData = async (data: Notes) => {
  await axios
    .post("http://localhost:8080/", { ...data })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDeletedNotes = async () => {
  return axios
    .get(`${BASE_URL}deleted`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const deleteNote = async (id: string): Promise<void> => {
  await axios
    .delete(`${BASE_URL}:${id}`)
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
