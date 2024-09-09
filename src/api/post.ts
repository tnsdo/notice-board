import { api } from "./axios";

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const getPostsByBoard = async (boardUuid: string) => {
  const response = await api.get(`/posts?boardUuid=${boardUuid}`);
  return response.data;
};

export const getPostsById = async (id: string) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export const writePost = async (
  boardUuid: string,
  postData: {
    title: string;
    body: string;
    tags: string[];
    images?: { image: string; id: string }[];
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

export const postImage = async (boardUuid: string, formData: FormData) => {
  try {
    const response = await api.post(`posts/${boardUuid}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error in postImage:", error);
    throw error;
  }
};
