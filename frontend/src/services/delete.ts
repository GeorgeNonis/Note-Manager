import axios, { AxiosError } from "axios";
import { BASE_URL } from "../config";

export const deleteNoteHttp = async <T, E>(
  id: string,
  pinned: boolean
): Promise<[T | E | null, AxiosError | null]> => {
  // console.log(id);
  // console.log(pinned);
  try {
    const response = await axios.delete<T, E>(
      `${BASE_URL}notes/:${id}?isnotepined=${pinned}`
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
    const response = await axios.delete<T, E>(
      `${BASE_URL}notes/labels/:${label}`
    );
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;

    return [null, err];
  }
};
