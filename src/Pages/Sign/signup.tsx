import "../../App.css";

import { useState } from "react";
import styled from "styled-components";

import { signUp } from "../../api/user";

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
  font-size: 15px;
  background-color: ${({ theme }) => theme.InputContainer};
  color: ${({ theme }) => theme.text};
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
  font-size: 15px;
  background-color: ${({ theme }) => theme.InputContainer};
  color: ${({ theme }) => theme.text};
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
  font-size: 15px;
  background-color: ${({ theme }) => theme.InputContainer};
  color: ${({ theme }) => theme.text};
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

  const handleSignUp = async () => {
    try {
      const userData = await signUp(email, password, nickname);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          nickname: userData.nickname,
          email: userData.email,
          password: userData.password,
        }),
      );
      alert("Sign up success!");
    } catch (error) {
      console.error("Error:", error);
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
