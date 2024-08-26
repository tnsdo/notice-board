import "../../App.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import homecat from "../../assets/homecat.png";
import wacat from "../../assets/wacat.png";

const SignContainer = styled.div`
  width: 500px;
  height: 300px;
  background-color: #f4f4f4;
  border-radius: 15px;
  transform: translateX(10%);
  margin-top: 150px;
  margin-right: 100px;
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
`;

const CatWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;

const HomeCat = styled.img`
  border-radius: 10%;
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin: 5px;
  cursor: pointer;
  transition: transform 0.1s;

  &:active {
    transform: scale(0.95);
  }
`;

const Sign = styled.div`
  margin-top: 10px;
`;

const SignIn = styled.button`
  border-color: black;
  background-color: white;
  margin-right: 20px;
  border-radius: 0;
`;

const SignUp = styled.button`
  border-color: black;
  background-color: white;
  border-radius: 0;
`;

function HomeBsignup() {
  const navigate = useNavigate();
  const [isWaCat, setisWaCat] = useState(false);

  const handleCatClick = () => {
    setisWaCat(true);
    const timer = setTimeout(() => {
      setisWaCat(false);
    }, 100);

    return () => clearTimeout(timer);
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
      <Sign>
        <SignIn onClick={handSignInClick}>Sign in</SignIn>
        <SignUp onClick={handSignUpClick}>Sign up</SignUp>
      </Sign>
    </SignContainer>
  );
}

export default HomeBsignup;
