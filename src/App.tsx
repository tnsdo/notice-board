import "./App.css";

import React from "react";
import styled from "styled-components";

import homecat from "./assets/homecat.png";

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

const SignContainer = styled.div`
  width: 500px;
  height: 300px;
  background-color: #f4f4f4;
  border-radius: 15px;
  left: 50%;
  transform: translateX(10%);
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Welcome = styled.div`
  color: black;
  font-size: 30px;
  margin-bottom: 20px;
  font-family: "Rubik Bubbles", system-ui;
`;

const HomeCat = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: fill;
  margin-bottom: 20px;
`;

const Sign = styled.div`
  width: 500px;
`;

const SignIn = styled.button`
  border-color: black;
  border-radius: 0;
  background-color: white;
  margin-right: 20px;
`;

const SignUp = styled.button`
  border-color: black;
  border-radius: 0;
  background-color: white;
`;

function App() {
  return (
    <Display>
      <Header>Board</Header>
      <SignContainer>
        <Welcome>Welcome!</Welcome>
        <HomeCat src={homecat} alt="homecat" />
        <Sign>
          <SignIn>Sign in</SignIn>
          <SignUp>Sign up</SignUp>
        </Sign>
      </SignContainer>
    </Display>
  );
}

export default App;
