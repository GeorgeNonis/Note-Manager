import { AxiosError, AxiosRequestConfig } from "axios";
import axios from "./axios";
import { BASE_URL } from "../config";
import { Labels } from "./interfaces";

export const getUsersHttp = async <T>(
  email: string,
  token: string
): Promise<[T | null | AxiosResponse, AxiosError | null]> => {
  // const token = sessionStorage.getItem("auth-token");
  try {
    const response = await axios.get<AxiosResponse | T>(
      `userexist?email=${email}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
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
export const getNotesHttp = async <T>(
  token: string
): Promise<[AxiosResponse | null, AxiosError | null]> => {
  try {
    const response = await axios.get<AxiosResponse>(`notes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return [response, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err];
  }
};

export const getLabelsHttp = async (
  token: string
): Promise<[Labels[] | null, AxiosError | null]> => {
  // const token = sessionStorage.getItem("auth-token");
  try {
    const response = await axios.get(`notes/labels`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return [response.data, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err];
  }
};
