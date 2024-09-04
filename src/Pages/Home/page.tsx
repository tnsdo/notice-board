import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import GetBoard from "../Board/getBoard";
import Post from "../post/showPost";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const MyPage = styled.div`
  font-size: 17px;
  font-weight: 500;
  padding: 10px;
  color: ${({ theme }) => theme.text};
  margin-left: 20px;
`;

const SignOut = styled.div`
  font-size: 17px;
  font-weight: 500;
  padding: 10px;
  color: ${({ theme }) => theme.text};
  margin-right: 20px;
`;

const WritePost = styled.button`
  border-radius: 0;
  border-color: ${({ theme }) => theme.buttonBorder};
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
`;

const Divider = styled.div`
  height: 20px;
  width: 1px;
  background-color: ${({ theme }) => theme.text};
  margin: 0;
`;

function Home() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  const handleWritePost = () => {
    navigate("/posts");
  };

  const handleMyPage = () => {
    navigate("/user");
  };

  return (
    <Container>
      <Header>
        <MyPage onClick={handleMyPage}>My Page</MyPage>
        <Divider />
        <GetBoard />
        <Divider />
        <SignOut onClick={handleSignOut}>Sign Out</SignOut>
      </Header>
      <WritePost onClick={handleWritePost}>Write Post✏️</WritePost>
      <Post />
    </Container>
  );
}

export default Home;
