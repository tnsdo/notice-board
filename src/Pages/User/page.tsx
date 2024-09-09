import React from "react";
import { useAuth } from "src/context/userContext";
import styled from "styled-components";

import profile from "../../assets/profile.png";

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
  margin-bottom: 20px;
  margin-right: auto;
`;

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const UserInfoBox = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  font-weight: 400;
  text-align: left;
  margin-bottom: 15px;
  margin-right: auto;
`;

const Nickname = styled.div`
  margin-bottom: 10px;
`;

const Email = styled.div`
  margin-bottom: 10px;
  margin-left: 33px;
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
  // 유저 정보가 안가져와지는 이유?
  const { user } = useAuth();
  //무한 로딩중임
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <UserContainer>
      <Divider>Profile</Divider>
      <ProfileImageContainer>
        <UserProfileImage src={profile} alt="profile" />
      </ProfileImageContainer>
      <DividerLine />
      <Divider>Info</Divider>
      <UserInfoBox>
        <Nickname>Nickname: {user.nickname}</Nickname>
        <Email>E-mail: {user.email}</Email>
      </UserInfoBox>
      <DividerLine />
      <SaveButton>Save</SaveButton>
    </UserContainer>
  );
};

export default UserInfo;
