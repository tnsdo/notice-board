import "./App.css";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import homecat from "./assets/homecat.png";

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
  border-radius: 10%;
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
  font-family: "Rubik Bubbles", system-ui;
  border-radius: 10%;
`;

const SignUp = styled.button`
  font-family: "Rubik Bubbles", system-ui;
  border-color: black;
  border-radius: 0;
  background-color: white;
  border-radius: 10%;
`;

function HomeBsignup() {
  const navigate = useNavigate();

  const handSignInClick = () => {
    navigate("/signin");
  };
  return (
    <SignContainer>
      <Welcome>Welcome!</Welcome>
      <HomeCat src={homecat} alt="homecat" />
      <Sign>
        <SignIn onClick={handSignInClick}>Sign in</SignIn>
        <SignUp>Sign up</SignUp>
      </Sign>
    </SignContainer>
  );
}

export default HomeBsignup;
