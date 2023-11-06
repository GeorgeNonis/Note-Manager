import { AxiosError, AxiosRequestConfig } from "axios";
import axios from "./axios";

export const getUsersHttp = async <T>(
  email: string
): Promise<[T | null | AxiosResponse, AxiosError | null]> => {
  try {
    const response = await axios.get<AxiosResponse | T>(
      `userexist?email=${email}`
    );
    return [response.data, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err];
  }
};
export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}
export const getNotesHttp = async <T>(): Promise<
  [AxiosResponse | null, AxiosError | null]
> => {
  try {
    const response = await axios.get<AxiosResponse>(`notes`);

    return [response, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err];
  }
};
