import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import styled, { useTheme } from "styled-components";

import { ThemeProvider } from "./Pages/Context/themeProvider.tsx";
import { AuthProvider, useAuth } from "./Pages/Context/userContext.tsx";
import OnBoarding from "./Pages/Home/onBoarding.tsx";
import Home from "./Pages/Home/page.tsx";
import Post from "./Pages/post/page.tsx";
import WritePost from "./Pages/post/writePost.tsx";
import SignIn from "./Pages/Sign/signin.tsx";
import SignUp from "./Pages/Sign/signup.tsx";
import { GlobalStyle } from "./Pages/Theme/global-style.ts";
import DarkModeToggle from "./Pages/Theme/toggle.tsx";
import MyPage from "./Pages/User/page.tsx";

const queryClient = new QueryClient();

const Background = styled.div`
  background-color: ${({ theme }) => theme.background};
  height: 100vh;
  width: 100vw;
`;

const Display = styled.div`
  width: 100%;
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
  color: ${({ theme }) => theme.text};
`;

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleHeaderClick = () => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  return (
    <ThemeProvider>
      <AppContentWithTheme handleHeaderClick={handleHeaderClick} />
    </ThemeProvider>
  );
};

const AppContentWithTheme: React.FC<{ handleHeaderClick: () => void }> = ({
  handleHeaderClick,
}) => {
  const { theme } = useTheme();

  return (
    <Background theme={theme}>
      <GlobalStyle theme={theme} />
      <DarkModeToggle />
      <Display>
        <Header onClick={handleHeaderClick}>Board</Header>
        <Routes>
          <Route path="/" element={<OnBoarding />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/write-post" element={<WritePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/user" element={<MyPage />} />
        </Routes>
      </Display>
    </Background>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
