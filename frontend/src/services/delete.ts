import { AxiosError } from "axios";
import axios from "./axios";

export const deleteNoteHttp = async <T, E>(
  id: string,
  pinned: boolean,
  archived: boolean
): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.delete<T, E>(
      `notes/:${id}?isnotepined=${pinned}&isarchived=${archived}`
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const deleteLabelHttp = async <T, E>(
  label: string
): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.delete<T, E>(`notes/labels/:${label}`);
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};

export const deleteAccountHttp = async <T, E>(
  email: string
): Promise<[T | E | null, AxiosError | null]> => {
  try {
    const response = await axios.get<T, E>(`account?email=${email}`);
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};
