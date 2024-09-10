import { api } from "./axios";

export const getTags = async () => {
  const response = await api.get(`/tag`);
  return response.data;
};

export const postTag = async (key: string) => {
  const response = await api.post(`/tag`, key);
  return response.data;
};
export const searchTag = async (keyword: string) => {
  const response = await api.get(`/tag?keyword=${keyword}`);
  return response.data;
};
