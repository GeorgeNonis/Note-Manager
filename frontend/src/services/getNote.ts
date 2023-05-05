import axios, { AxiosError, AxiosResponse } from "axios";
import { BASE_URL } from "../config";
import { Labels } from "./interfaces";

export const getUsersHttp = async <T>(
  email: string
): Promise<[T | null | AxiosResponse, AxiosError | null]> => {
  console.log({ email });
  try {
    const response = await axios.get<AxiosResponse | T>(
      `${BASE_URL}userexist?email=${email}`
    );
    return [response.data, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err];
  }
};

export const getNotesHttp = async <T>(
  email: string
): Promise<[T | null, AxiosError | null]> => {
  try {
    const response = await axios.get<T>(`${BASE_URL}notes?email=${email}`);
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
