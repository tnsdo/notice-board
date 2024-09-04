import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { ThemeProvider as StyledProvider } from "styled-components";

import { darkTheme, lightTheme, Theme } from "../Theme/theme";

interface ThemeContextType {
  ThemeMode: "light" | "dark";
  setThemeMode: (mode: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const localTheme =
    (window.localStorage.getItem("theme") as "light" | "dark") || "light";
  const [ThemeMode, setThemeMode] = useState<"light" | "dark">(localTheme);
  const themeObject: Theme = ThemeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ ThemeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};

function useTheme(): ["light" | "dark", () => void] {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  const { ThemeMode, setThemeMode } = context;

  const toggleTheme = useCallback(() => {
    console.log("토글 전 테마:", ThemeMode);
    if (ThemeMode === "light") {
      setThemeMode("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      setThemeMode("light");
      window.localStorage.setItem("theme", "light");
    }
    console.log("토글 후 테마:", ThemeMode);
  }, [ThemeMode, setThemeMode]);

  return [ThemeMode, toggleTheme];
}

export { ThemeProvider, useTheme };

export default ThemeProvider;
