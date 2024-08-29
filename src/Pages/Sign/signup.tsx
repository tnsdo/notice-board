import "../../App.css";

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "../../Pages/Context/userContext";

const SignContainer = styled.div`
  width: 500px;
  height: 300px;
  background-color: ${({ theme }) => theme.signContainer};
  border-radius: 15px;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NameContainer = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  margin-top: 20px;
  width: 400px;
  margin-right: 60px;
`;

const NickName = styled.input`
  width: 120px;
  height: 22px;
  margin-left: 20px;
`;

const EmailContainer = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  margin-top: 20px;
  width: 400px;
  margin-right: 25px;
`;

const Email = styled.input`
  width: 120px;
  height: 22px;
  margin-left: 20px;
`;

const PwContainer = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  width: 400px;
  margin-right: 48px;
`;

const Password = styled.input`
  width: 120px;
  height: 22px;
  margin-top: 20px;
  margin-left: 15px;
`;

const Check = styled.button`
  width: 100px;
  font-size: 15px;
  border-color: ${({ theme }) => theme.buttonBorder};
  margin-top: 30px;
  margin-left: auto;
  margin-right: 50px;
  border-radius: 0;
`;

function SignUp() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSignUp = async () => {
    if (!nickname || !email || !password) {
      alert("Enter all fields.");
      return;
    }

    try {
      await axios.post(
        "https://api.2024.newbies.gistory.me/auth/register",
        { nickname, email, password },
        { headers: { "Content-Type": "application/json" } },
      );

      localStorage.setItem("nickname", nickname);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      alert("Sign up success!");

      await signIn(email, password);

      navigate("/home");
    } catch (error) {
      console.error("Failed to sign up:", error);
      alert("Failed to sign up. Please try again.");
    }
  };

  return (
    <SignContainer>
      <NameContainer>
        NickName
        <NickName
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </NameContainer>
      <EmailContainer>
        E-mail
        <Email
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </EmailContainer>
      <PwContainer>
        Password
        <Password
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </PwContainer>
      <Check onClick={handleSignUp}>Sign up</Check>
    </SignContainer>
  );
}

export default SignUp;
