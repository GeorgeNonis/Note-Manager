import { AxiosError } from "axios";
import axios from "./axios";

export const deleteNoteHttp = async <T, E>(
  id: string,
  pinned: boolean,
  archived: boolean,
  token: string
): Promise<[T | E | null, AxiosError | null]> => {
  // const token = sessionStorage.getItem("auth-token");

  try {
    const response = await axios.delete<T, E>(
      `notes/:${id}?isnotepined=${pinned}&isarchived=${archived}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const deleteLabelHttp = async <T, E>(
  label: string,
  token: string
): Promise<[T | E | null, AxiosError | null]> => {
  // const token = sessionStorage.getItem("auth-token");

  try {
    const response = await axios.delete<T, E>(`notes/labels/:${label}`, {
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

export const deleteAccountHttp = async <T, E>(
  email: string,
  token: string
): Promise<[T | E | null, AxiosError | null]> => {
  // const token = sessionStorage.getItem("auth-token");

  try {
    const response = await axios.get<T, E>(`account?email=${email}`, {
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
