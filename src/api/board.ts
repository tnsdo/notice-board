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
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("액세스 토큰이 없습니다.");
  }

  try {
    const response = await api.delete(`/boards/${boardUuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("게시판 삭제 중 오류:", error);
    throw error;
  }
};
