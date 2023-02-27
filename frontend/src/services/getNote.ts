import axios, { AxiosError, AxiosResponse } from "axios";
import { BASE_URL } from "../config";

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
