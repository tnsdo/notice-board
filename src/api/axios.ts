import axios from "axios";

const api = axios.create({
  baseURL: "https://api.2024.newbies.gistory.me",
  withCredentials: true,
});

export default api;
