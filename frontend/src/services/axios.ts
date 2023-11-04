import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "../config";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.get("auth-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
