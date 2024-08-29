import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://api.2024.newbies.gistory.me",
  withCredentials: true,
});

export default api;
