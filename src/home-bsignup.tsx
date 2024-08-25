import "./App.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import homecat from "./assets/homecat.png";

const SignContainer = styled.div`
  width: 500px;
  height: 300px;
  background-color: #f4f4f4;
  border-radius: 15px;
  transform: translateX(10%);
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
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
  cursor: pointer;
  z-index: 1;
  position: relative;
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
  const [isWaCatVisible, setWaCatVisible] = useState(false);

  const handleHomeCatClick = () => {
    setWaCatVisible(true);
  };

  useEffect(() => {
    if (isWaCatVisible) {
      const timer = setTimeout(() => {
        setWaCatVisible(false);
      }, 200); // Show wacat for 200ms
      return () => clearTimeout(timer);
    }
  }, [isWaCatVisible]);

  const handSignInClick = () => {
    navigate("/signin");
  };
  const handSignUpClick = () => {
    navigate("/signup");
  };
  return (
    <SignContainer>
      <Welcome>Welcome!</Welcome>
      <HomeCat src={homecat} alt="homecat" onClick={handleHomeCatClick} />
      <Sign>
        <SignIn onClick={handSignInClick}>Sign in</SignIn>
        <SignUp onClick={handSignUpClick}>Sign up</SignUp>
      </Sign>
    </SignContainer>
  );
}

export default HomeBsignup;
