import "./App.css";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";

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

function SignIn() {
  const [showPswd, setShowPswd] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPswd((prevState) => !prevState);
  };

  return (
    <SignContainer>
      <IdContainer>
        Id
        <Id type="text" />
      </IdContainer>
      <PwContainer>
        Password
        <Password type={showPswd ? "text" : "password"} />
        <TogglePasswordButton onClick={toggleShowPassword}>
          {showPswd ? <FaEyeSlash /> : <FaEye />}
        </TogglePasswordButton>
      </PwContainer>
      <Check>Sign in</Check>
    </SignContainer>
  );
}

export default SignIn;
