import "../../App.css";

import styled from "styled-components";

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
  return (
    <SignContainer>
      <NameContainer>
        NickName
        <NickName type="text" />
      </NameContainer>
      <EmailContainer>
        E-mail
        <Email type="text" />
      </EmailContainer>
      <PwContainer>
        Password
        <Password type="password" />
      </PwContainer>
      <Check>Sign up</Check>
    </SignContainer>
  );
}

export default SignUp;
