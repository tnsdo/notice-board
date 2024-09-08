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
    body: string;
    tags: string[];
  },
) => {
  try {
    const response = await api.post(`/posts`, postData, {
      params: {
        boardUuid,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in writePost:", error);
    throw error;
  }
};
