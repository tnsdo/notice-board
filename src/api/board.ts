import axios from "axios";

import { api } from "./axios";

export const getBoard = async () => {
  const response = await api.get("/boards", {});
  return response.data;
};

export const createBoard = async (title: string) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Access token expired");
  }

  try {
    const response = await api.post(
      "/boards",
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("Access token expired");
    }
    throw error;
  }
};
