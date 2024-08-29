import React, { createContext, useCallback, useContext, useState } from "react";

import api from "../../api/axios";

interface AuthContextType {
  email: string;
  accessToken: string | null;
  refreshToken: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken, refreshToken, expiresIn } = response.data;

      setEmail(email);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      localStorage.setItem("email", email);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("expiresIn", expiresIn.toString());

      console.log("Sign in success!");
    } catch (error) {
      console.error("Sign in failed:", error);
      throw error;
    }
  }, []);

  const signOut = useCallback(() => {
    setEmail("");
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("email");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiresIn");
  }, []);

  return (
    <AuthContext.Provider
      value={{ email, accessToken, refreshToken, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
