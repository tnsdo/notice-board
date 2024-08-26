import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";

import HomeBsignup from "./Pages/Home/first page.tsx";
import SignIn from "./Pages/Sign in/signin.tsx";
import SignUp from "./Pages/Sign in/signup.tsx";

const queryClient = new QueryClient();

const Display = styled.div`
  width: 600px;
  height: 100vh;
  position: relative;
  overflow-y: auto;
`;

const Header = styled.div`
  font-family: -apple-system-headline, BlinkMacSystemFont, sans-serif;
  text-align: center;
  font-size: 50px;
  line-height: 50px;
  color: black;
  margin-top: 20px;
`;

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  const handHeaderClick = () => {
    navigate("/");
  };

  return (
    <Display>
      <Header onClick={handHeaderClick}>Board</Header>
      <Routes>
        <Route path="/" element={<HomeBsignup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Display>
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
