import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { refresh } from "src/api/user";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: string | null;
  setToken: (token: string | null) => void;
  signOut: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(() =>
    localStorage.getItem("accessToken"),
  );

  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(!!accessToken);

  const [expiresIn, setExpiresIn] = useState<string | null>(
    () => localStorage.getItem("expiresIn"), // 수정: localStorage에서 expiresIn 가져오기
  );

  useEffect(() => {
    if (expiresIn) {
      setExpiresIn(expiresIn); // 추가: expiresIn이 변경될 때 setExpiresIn 호출
    }
  }, [expiresIn]);

  const signOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiresIn");
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const newAccessToken = await refresh(); // 변수 이름 변경 및 accessToken 갱신
      console.log(newAccessToken);
      setAccessTokenState(newAccessToken); // 갱신된 accessToken 설정
    }
  };

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (expiresIn) {
          refreshAccessToken(); // expiresIn에 따라 accessToken 갱신
        }
      },
      expiresIn ? Number(expiresIn) * 1000 : 0,
    );

    return () => clearTimeout(timer);
  }, [expiresIn]);

  const value: AuthContextType = {
    accessToken,
    refreshToken: null, // 추가: refreshToken 초기화
    expiresIn: null, // 추가: expiresIn 초기화
    setToken: setAccessTokenState, // 추가: setToken 추가
    signOut,
    isAuthenticated,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
