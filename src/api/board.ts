import { api } from "./axios";

export const getBoard = async () => {
  const response = await api.get("/boards", {});
  return response.data;
};

export const newBoard = async (title: string) => {
  const response = await api.post("/boards", { title: title });
  return response.data;
};
