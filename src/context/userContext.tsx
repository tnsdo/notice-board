import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  signOut: () => void;
  isAuthenticated: boolean;
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
  const [token, setTokenState] = useState<string | null>(() =>
    localStorage.getItem("accessToken"),
  );

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("accessToken", newToken);
    } else {
      localStorage.removeItem("accessToken");
    }
    setTokenState(newToken);
  };

  const signOut = () => {
    setToken(null);
    localStorage.removeItem("refreshToken");
  };

  const value: AuthContextType = {
    token,
    setToken,
    signOut,
    isAuthenticated: !!token, // 추가된 부분
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
