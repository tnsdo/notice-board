import "./App.css";

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
import SignIn from "./Pages/Sign/signin.tsx";
import SignUp from "./Pages/Sign/signup.tsx";

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
  font-weight: 400;
  line-height: 50px;
  color: black;
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
