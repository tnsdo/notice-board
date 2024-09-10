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

export const deletePost = async (id: string) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export const deleteImage = async (id: string, imageId: string) => {
  const response = await api.delete(`/posts/${id}/image/${imageId}`);
  return response.data;
};

export const editPost = async (
  id: string,
  postData: {
    title: string;
    body: string;
    tags: string[];
  },
) => {
  const response = await api.patch(`/posts/${id}`, postData);
  return response.data;
};

export const postImage = async (id: string, image: File) => {
  const formData = new FormData();
  formData.append("file", image);

  const response = await api.post(`/posts/${id}/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const searchPost = async (keyword: string) => {
  const response = await api.get(`/posts/search?keyword=${keyword}`);
  return response.data;
};
