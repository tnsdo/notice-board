import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";

import HomeBsignup from "./Pages/Home/first page.tsx";
import SignIn from "./Pages/Sign/signin.tsx";
import SignUp from "./Pages/Sign/signup.tsx";
import { ThemeContext } from "./Pages/Theme/themeContext";

const queryClient = new QueryClient();

const Display = styled.div`
  width: 600px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  font-size: 50px;
  font-weight: 600;
  line-height: 50px;
  color: black;
  color: #000000;
`;

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  const handHeaderClick = () => {
    navigate("/");
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <Display>
        <Header onClick={handHeaderClick}>Board</Header>
        <Routes>
          <Route path="/" element={<HomeBsignup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Display>
    </ThemeContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
