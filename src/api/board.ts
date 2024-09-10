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
    console.error("Error in createBoard:", error);
    throw error;
  }
};

export const deleteBoard = async (boardUuid: string) => {
  const response = await api.delete(`/boards/${boardUuid}`);
  return response.data;
};
