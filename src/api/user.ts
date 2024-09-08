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

export const refresh = async (refreshToken: string) => {
  const response = await api.post(
    "/auth/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );
  return response.data;
};
