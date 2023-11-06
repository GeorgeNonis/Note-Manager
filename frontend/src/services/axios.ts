import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("auth-token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response;

    if (status === 401) {
      toast.error("Unauthorized Action");
    } else if (error.message && !data) {
      toast.error("Network Error. Please try again later.");
    } else {
      toast.error(data.message || "An unexpected error occurred");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
