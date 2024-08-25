import "./App.css";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const IdContainer = styled.div`
  font-size: 20px;
  color: black;
  font-family: "Rubik Bubbles", system-ui;
  margin-top: 35px;
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
  width: 500px;
  text-align: left;
  margin-left: 190px;
`;

const Password = styled.input`
  width: 120px;
  height: 22px;
  margin-top: 20px;
  margin-left: 18px;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  margin-top: 25px;
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

function SignIn() {
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPswd((prevState) => !prevState);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: { id: string; password: string }) => u.id === id && u.password === password);
    if (user) {
      // 로그인 성공
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <SignContainer>
      <BackButton onClick={handleBackClick}>Back</BackButton>
      <form onSubmit={handleSignIn}>
        <IdContainer>
          Id
          <Id type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        </IdContainer>
        <PwContainer>
          Password
          <Password 
            type={showPswd ? "text" : "password"} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <TogglePasswordButton type="button" onClick={toggleShowPassword}>
            {showPswd ? <FaEyeSlash /> : <FaEye />}
          </TogglePasswordButton>
        </PwContainer>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Check type="submit">Sign in</Check>
      </form>
    </SignContainer>
  );
}

export default SignIn;