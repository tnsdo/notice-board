import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "/local",
  withCredentials: true,
});

export default api;
