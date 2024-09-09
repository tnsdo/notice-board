import React, { useState } from "react";
import styled from "styled-components";

const UserContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
`;

const Divider = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  margin-top: 5px;
  margin-bottom: 20px;
  margin-right: auto;
`;

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

const UserInfoBox = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  font-weight: 400;
  text-align: left;
  margin-bottom: 15px;
  margin-right: auto;
`;

const CurrentPWContainer = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  margin-top: 10px;
  padding-right: 60px;
  width: 400px;
`;

const CurrentPW = styled.input`
  margin-bottom: 10px;
  margin-left: 10px;
`;

const NewPWContainer = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  margin-top: 10px;
  padding-right: 60px;
  width: 400px;
  margin-left: 27px;
`;

const NewPW = styled.input`
  margin-bottom: 10px;
  margin-left: 10px;
`;

const SaveButton = styled.button`
  border-radius: 0;
  border-color: ${({ theme }) => theme.buttonBorder};
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};
  margin-top: 30px;
  width: 100px;
  right: 10%;
  transform: translateX(200%);
`;

const UserInfo: React.FC = () => {
  const [currentPW, setCurrentPW] = useState("");
  const [newPW, setNewPW] = useState("");

  return (
    <UserContainer>
      <Divider>Change PW</Divider>
      <UserInfoBox>
        <CurrentPWContainer>
          Current Password:
          <CurrentPW
            type="text"
            value={currentPW}
            onChange={(e) => setCurrentPW(e.target.value)}
          />
        </CurrentPWContainer>
        <NewPWContainer>
          New Password:
          <NewPW
            type="text"
            value={newPW}
            onChange={(e) => setNewPW(e.target.value)}
          />
        </NewPWContainer>
      </UserInfoBox>
      <DividerLine />
      <SaveButton>Save</SaveButton>
    </UserContainer>
  );
};

export default UserInfo;
