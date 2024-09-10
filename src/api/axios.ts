import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { refresh } from "./user";

export const api = axios.create({
  baseURL: "/local",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

api.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig; // Use the extended interface

    if (error.response?.status === 401 && originalRequest) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshTokenResponse = await refresh();

          const { accessToken, refreshToken } = refreshTokenResponse;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          alert("인증이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.clear();
          window.location.href = "/signin";
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);
