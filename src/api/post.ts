import { api } from "./axios";

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const getPostsByBoard = async (boardUuid: string) => {
  const response = await api.get(`/posts?boardUuid=${boardUuid}`);
  return response.data;
};

export const writePost = async (
  boardUuid: string,
  postData: {
    title: string;
    content: string;
    tags: string[];
  },
) => {
  const response = await api.post(`/posts?boardUuid=${boardUuid}`, postData);
  return response.data;
};
