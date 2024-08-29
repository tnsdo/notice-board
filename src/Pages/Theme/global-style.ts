import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { Theme } from "./theme";

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  ${reset}
  html, body, #root {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  button {
    border-color: ${({ theme }) => theme.buttonBorder};
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }
`;
