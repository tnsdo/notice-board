import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

export const light = {
  bakcground: "#ffffff",
  text: "#000000",
  signContainer: "#f4f4f4",
};

export const dark = {
  bakcground: "#000000",
  text: "#ffffff",
  signContainer: "#494949",
};

export type Theme = typeof light;
export const { default: styled } =
  styledComponents as any as ThemedStyledComponentsModule<Theme>;
