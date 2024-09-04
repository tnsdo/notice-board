import axios from "axios";

export const api = axios.create({
  baseURL: "/local",
  headers: {
    "Content-Type": "application/json",
  },
});
