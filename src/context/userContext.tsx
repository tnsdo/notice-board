import React, { createContext, ReactNode, useContext, useState } from "react";

import { User } from "../type";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setRefreshToken: (token: string) => void;
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
  const [user, setUserState] = useState<User | null>(() =>
    JSON.parse(localStorage.getItem("userInfo") || "null"),
  );
  const [, setRefreshTokenState] = useState<string | null>(() =>
    localStorage.getItem("refreshToken"),
  );

  const setAccessToken = (newAccessToken: string | null) => {
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
    setAccessTokenState(newAccessToken);
  };

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
  };

  const setRefreshToken = (newRefreshToken: string | null) => {
    if (newRefreshToken) {
      localStorage.setItem("refreshToken", newRefreshToken);
    } else {
      localStorage.removeItem("refreshToken");
    }
    setRefreshTokenState(newRefreshToken);
  };

  const signOut = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
  };

  const value: AuthContextType = {
    accessToken,
    setAccessToken,
    signOut,
    isAuthenticated: !!accessToken,
    user,
    setUser,
    setRefreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
