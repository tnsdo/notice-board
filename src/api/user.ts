import { api } from "./axios";

export const signUp = async (
  email: string,
  password: string,
  nickname: string,
) => {
  const response = await api.post("/auth/register", {
    nickname,
    email,
    password,
  });
  return response.data;
};

export const signIn = async (email: string, password: string) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const refresh = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await api.post(
    "/auth/refresh",
    { refreshToken },
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );
  return response.data;
};
