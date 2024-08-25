import "./App.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import homecat from "./assets/homecat.png";
import wacat from "./assets/wacat.png";
import Ranking from "./Ranking";

const SignContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: #f4f4f4;
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
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

const ClickCount = styled.div`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ButtonBase = styled.button`
  font-family: "Rubik Bubbles", system-ui;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 25px;
`;

const SignIn = styled(ButtonBase)`
  background-color: #4CAF50;
  color: white;

  &:hover {
    background-color: #45a049;
    transform: translateY(-3px);
  }
`;

const SignUp = styled(ButtonBase)`
  background-color: #008CBA;
  color: white;

  &:hover {
    background-color: #007B9E;
    transform: translateY(-3px);
  }
`;

function HomeBsignup() {
  const navigate = useNavigate();
  const [catStates, setCatStates] = useState(Array(6).fill(false));
  const [clickCount, setClickCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<{ name: string; id: string; clickCount: number } | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser({ ...parsedUser, clickCount: parsedUser.clickCount || 0 });
    }
  }, []);

  const handleCatClick = () => {
    setCatStates(prevStates => prevStates.map(() => true));
    setTimeout(() => {
      setCatStates(prevStates => prevStates.map(() => false));
    }, 100);
    setClickCount(prevCount => prevCount + 1);

    if (currentUser) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((user: any) => {
        if (user.id === currentUser.id) {
          return { ...user, clickCount: (user.clickCount || 0) + 1 };
        }
        return user;
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setCurrentUser(prevUser => prevUser ? { ...prevUser, clickCount: (prevUser.clickCount || 0) + 1 } : null);
      
      window.dispatchEvent(new Event('updateRanking'));
    }
  };

  const handSignInClick = () => {
    navigate("/signin");
  };

  const handSignUpClick = () => {
    navigate("/signup");
  };

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <SignContainer>
      <Welcome>{currentUser ? `Welcome, ${currentUser.name}!` : "Welcome!"}</Welcome>
      <CatWrapper>
        {catStates.map((isWaCat, index) => (
          <HomeCat 
            key={index}
            src={isWaCat ? wacat : homecat} 
            alt={isWaCat ? "wacat" : "homecat"} 
            onClick={handleCatClick} 
          />
        ))}
      </CatWrapper>
      <ClickCount>클릭 횟수: {currentUser ? currentUser.clickCount || 0 : clickCount}</ClickCount>
      <Ranking />
      <ButtonContainer>
        {currentUser ? (
          <SignIn onClick={handleSignOut}>Sign out</SignIn>
        ) : (
          <>
            <SignIn onClick={handSignInClick}>Sign in</SignIn>
            <SignUp onClick={handSignUpClick}>Sign up</SignUp>
          </>
        )}
      </ButtonContainer>
    </SignContainer>
  );
}

export default HomeBsignup;