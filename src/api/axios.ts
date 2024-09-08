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

api.interceptors.response.use(
  async (response: AxiosResponse) => {
    const { data } = response;

    if (data.resultCode === 0) {
      return response;
    } else if (data.resultCode === 1001) {
      const originalRequest = response.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const refreshResponse = await refresh(refreshToken);
            const newAccessToken = refreshResponse.resultData?.accessToken;
            if (newAccessToken) {
              localStorage.setItem("accessToken", newAccessToken);
              api.defaults.headers.common["Authorization"] =
                `Bearer ${newAccessToken}`;
              return api(originalRequest);
            }
          } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/signin";
          }
        }
      }
    } else if (data.resultCode === 1002) {
      alert("인증이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.clear();
      window.location.href = "/signin";
    }
    return response;
  },
  async (error: AxiosError) => {
    if (!error.response) {
      alert("네트워크 오류가 발생했습니다.");
    }
    return Promise.reject(error);
  },
);
