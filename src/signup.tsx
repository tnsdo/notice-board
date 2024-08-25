import "./App.css";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

const NameContainer = styled.div`
  font-size: 20px;
  color: black;
  font-family: "Rubik Bubbles", system-ui;
  margin-top: 35px;
  width: 400px;
  margin-left: -17px;
`;

const Name = styled.input`
  width: 120px;
  height: 22px;
  margin-left: 20px;
`;

const IdContainer = styled.div`
  font-size: 20px;
  color: black;
  font-family: "Rubik Bubbles", system-ui;
  margin-top: 20px;
  width: 400px;
  margin-left: 20px;
`;

const Id = styled.input`
  width: 120px;
  height: 22px;
  margin-left: 20px;
`;

const PwContainer = styled.div`
  font-size: 20px;
  color: black;
  font-family: "Rubik Bubbles", system-ui;
  width: 400px;
  text-align: left;
  margin-left: 98px;
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
  border-color: black;
  font-family: "Rubik Bubbles", system-ui;
  margin-top: 30px;
  margin-left: auto;
  margin-right: 50px;
`;

const BackButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #f0f0f0;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Rubik Bubbles", system-ui;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((user: { id: string }) => user.id === id)) {
      setError("이미 존재하는 ID입니다.");
      return;
    }
    users.push({ name, id, password, clickCount: 0 });
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/signin");
  };

  return (
    <SignContainer>
      <BackButton onClick={handleBackClick}>Back</BackButton>
      <form onSubmit={handleSignUp}>
        <NameContainer>
          Name
          <Name type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </NameContainer>
        <IdContainer>
          Id
          <Id type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        </IdContainer>
        <PwContainer>
          Password
          <Password type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </PwContainer>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Check type="submit">Sign up</Check>
      </form>
    </SignContainer>
  );
}

export default SignUp;