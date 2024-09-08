import React from "react";
import styled from "styled-components";

import { useTheme } from "../context/themeProvider";

const ToggleContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding-top: 10px;
  padding-right: 30px;
`;

const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 27px;
`;

const ToggleButton = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.toggleButton};
  }

  &:checked + span:before {
    transform: translateX(21px);
  }
`;

const ToggleText = styled.span`
  color: ${({ theme }) => theme.toggleText};
  margin-right: 10px;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.toggleButton};
  transition: 0.4s;
  border-radius: 27px;

  &:before {
    position: absolute;
    content: "";
    height: 21px;
    width: 21px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const DarkModeToggle: React.FC = () => {
  const [ThemeMode, toggleTheme] = useTheme();

  return (
    <ToggleContainer>
      <ToggleText>
        {ThemeMode === "dark" ? "Dark Mode" : "Light Mode"}
      </ToggleText>
      <ToggleLabel>
        <ToggleButton
          type="checkbox"
          checked={ThemeMode === "dark"}
          onChange={toggleTheme}
        />
        <ToggleSlider />
      </ToggleLabel>
    </ToggleContainer>
  );
};

export default DarkModeToggle;
