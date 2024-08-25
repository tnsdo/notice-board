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

import HomeBsignup from "./home-bsignup";
import SignIn from "./signin";

const queryClient = new QueryClient();

const Display = styled.div`
  width: 600px;
  height: 100vh;
  position: relative;
  overflow-y: auto;
`;

const Header = styled.div`
  font-family: "Rubik Bubbles", system-ui;
  text-align: center;
  font-size: 50px;
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
