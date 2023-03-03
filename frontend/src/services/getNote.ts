import axios, { AxiosError, AxiosResponse } from "axios";
import { BASE_URL } from "../config";
import { Labels } from "./interfaces";

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

export const getLabelsHttp = async (): Promise<
  [Labels[] | null, AxiosError | null]
> => {
  try {
    const response = await axios.get(`${BASE_URL}notes/labels`);
    // const data:Test = response?.data[0]
    return [response.data, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err];
  }
};
