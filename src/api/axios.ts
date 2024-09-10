import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

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
      // accessToken 만료 시 처리 생략
      return response; // 그냥 응답을 반환
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
