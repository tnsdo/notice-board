import "../../App.css";

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

function SignUp() {
  return (
    <SignContainer>
      <NameContainer>
        Name
        <Name type="text" />
      </NameContainer>
      <IdContainer>
        Id
        <Id type="text" />
      </IdContainer>
      <PwContainer>
        Password
        <Password type="password" />
      </PwContainer>
      <Check>Sign up</Check>
    </SignContainer>
  );
}

export default SignUp;
