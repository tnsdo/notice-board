import "./App.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import homecat from "./assets/homecat.png";
import wacat from "./assets/wacat.png";

const SignContainer = styled.div`
  width: 600px;
  height: 400px;
  background-color: #f4f4f4;
  border-radius: 15px;
  transform: translateX(10%);
  margin-top: 100px;
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

const CatWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

const HomeCat = styled.img`
  border-radius: 10%;
  width: 200px;
  height: 200px;
  object-fit: cover;
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
  const [isWaCat, setIsWaCat] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleCatClick = () => {
    setIsWaCat(true);
    setClickCount((prevCount) => prevCount + 1);
    setTimeout(() => {
      setIsWaCat(false);
    }, 100); // 0.1초 후에 다시 homecat으로 변경
  };

  const handSignInClick = () => {
    navigate("/signin");
  };
  const handSignUpClick = () => {
    navigate("/signup");
  };
  return (
    <SignContainer>
      <Welcome>Welcome!</Welcome>
      <CatWrapper>
        <HomeCat 
          src={isWaCat ? wacat : homecat} 
          alt={isWaCat ? "wacat" : "homecat"} 
          onClick={handleCatClick} 
        />
      </CatWrapper>
      <clickCount>클릭 횟수: {clickCount}</clickCount>
      <Sign>
        <SignIn onClick={handSignInClick}>Sign in</SignIn>
        <SignUp onClick={handSignUpClick}>Sign up</SignUp>
      </Sign>
    </SignContainer>
  );
}

export default HomeBsignup;