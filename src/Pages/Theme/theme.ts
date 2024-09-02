export interface Theme {
  background: string;
  text: string;
  signContainer: string;
  buttonBorder: string;
  buttonBackground: string;
  toggleButton: string;
  toggleText: string;
  InputContainer: string;
}

export const lightTheme: Theme = {
  background: "#ffffff",
  text: "#000000",
  signContainer: "#f4f4f4",
  buttonBorder: "#000000",
  buttonBackground: "#ffffff",
  toggleButton: "#e9e9ea",
  toggleText: "#000000",
  InputContainer: "#ffffff",
};

export const darkTheme: Theme = {
  background: "#000000",
  text: "#ffffff",
  signContainer: "rgb(28,28,30)",
  buttonBorder: "#ffffff",
  buttonBackground: "#000000",
  toggleButton: "#24c64c",
  toggleText: "#ffffff",
  InputContainer: "rgb(28,28,30)",
};

export const theme = {
  lightTheme,
  darkTheme,
};
