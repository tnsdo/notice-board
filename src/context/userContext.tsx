import React, { createContext, ReactNode, useContext, useState } from "react";

import { User } from "../type";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
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
  const [user, setUserState] = useState<User | null>(() =>
    JSON.parse(localStorage.getItem("userInfo") || "null"),
  );
  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(!!accessToken);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("accessToken", newToken);
    } else {
      localStorage.removeItem("accessToken");
    }
    setAccessTokenState(newToken);
  };

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
  };

  const signOut = () => {
    setToken(null);
    localStorage.removeItem("refreshToken");
  };

  const value: AuthContextType = {
    token: accessToken,
    setToken,
    signOut,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
