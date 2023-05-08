import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../config";

const getToken = () => {
  const token = sessionStorage.get("auth-token");
  return token;
};

export default axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  //   Authorization: getToken(),
  // },
});
