import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";

const SignContainer = styled.div`
  width: 500px;
  height: 300px;
  background-color: #f4f4f4;
  border-radius: 15px;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IdContainer = styled.div`
  font-size: 20px;
  color: black;
  padding-top: 35px;
  padding-right: 20px;
  width: 400px;
`;

const Id = styled.input`
  width: 120px;
  height: 22px;
  margin-left: 18px;
`;

const PwContainer = styled.div`
  font-size: 20px;
  color: black;
  width: 500px;
  text-align: left;
  padding-left: 183px;
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
  padding-top: 25px;
`;

const Sign = styled.button`
  width: 100px;
  text-align: center;
  font-size: 15px;
  border-color: black;
  margin-top: 50px;
  margin-left: auto;
  margin-right: 50px;
  border-radius: 0;
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
      <Sign>Sign in</Sign>
    </SignContainer>
  );
}

export default SignIn;
