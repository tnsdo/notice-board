import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { signIn } from "../../api/user";
import { useAuth } from "../../context/userContext";

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

const EmailContainer = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  padding-top: 35px;
  padding-right: 60px;
  width: 400px;
`;

const Email = styled.input`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.InputContainer};
  width: 120px;
  height: 22px;
  margin-left: 18px;
  font-size: 15px;
`;

const PwContainer = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  width: 500px;
  text-align: left;
  padding-left: 183px;
`;

const Password = styled.input`
  width: 120px;
  height: 22px;
  margin-top: 20px;
  margin-left: 18px;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.InputContainer};
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  padding-top: 25px;
  color: ${({ theme }) => theme.text};
`;

const Sign = styled.button`
  width: 100px;
  text-align: center;
  font-size: 15px;
  border-color: ${({ theme }) => theme.buttonBorder};
  margin-top: 50px;
  margin-left: auto;
  margin-right: 50px;
  border-radius: 0;
`;

function SignIn() {
  const [showPswd, setShowPswd] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { setToken, setIsAuthenticated } = useAuth();

  const handleSignIn = async () => {
    try {
      const userData = await signIn(email, password);

      setToken(userData.accessToken);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPswd((prevState) => !prevState);
  };

  return (
    <SignContainer>
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
          type={showPswd ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TogglePasswordButton onClick={toggleShowPassword}>
          {showPswd ? <FaEyeSlash /> : <FaEye />}
        </TogglePasswordButton>
      </PwContainer>
      <Sign onClick={handleSignIn}>Sign in</Sign>
    </SignContainer>
  );
}

export default SignIn;
