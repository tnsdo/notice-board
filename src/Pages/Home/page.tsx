import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "src/type";
import styled from "styled-components";

import { useAuth } from "../../context/userContext";
import * as item from "../../styles/post.styled";
import GetBoard from "../Board/getBoard";
import Posts from "../post/allPost";
import Search from "./search";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
`;

const HeaderContainer = styled.div`
  position: fixed;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  margin-top: 40px;
  background-color: ${({ theme }) => theme.background};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 20px 0 0 0;
  background-color: ${({ theme }) => theme.background};
`;

const MyPage = styled.div`
  font-size: 17px;
  font-weight: 500;
  padding: 10px;
  color: ${({ theme }) => theme.text};
  margin-left: 40px;
`;

const SignOut = styled.div`
  font-size: 17px;
  font-weight: 500;
  padding: 10px;
  color: ${({ theme }) => theme.text};
  margin-right: 40px;
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 5px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px 0;
  z-index: 1000;
`;

const Button = styled.button`
  border-radius: 0;
  border-color: ${({ theme }) => theme.buttonBorder};
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 15px;
`;

const Divider = styled.div`
  height: 20px;
  width: 1px;
  background-color: ${({ theme }) => theme.text};
  margin: 0;
`;

function Home() {
  const [searchResults, setSearchResults] = useState<Post[]>([]); // 검색 결과를 Post 배열로 관리
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    window.location.href = "/";
  };

  const handleWritePost = () => {
    navigate("/write-post");
  };

  const handleMyPage = () => {
    navigate("/user");
  };

  const handleCreateBoard = () => {
    navigate("/create-board");
  };

  const handleSearchResults = (results: Post[]) => {
    setSearchResults(results); // Search 컴포넌트에서 검색 결과를 받아서 상태를 업데이트
  };

  return (
    <Container>
      <HeaderContainer>
        <Header>
          <MyPage onClick={handleMyPage}>My Page</MyPage>
          <Divider />
          <GetBoard />
          <Divider />
          <SignOut onClick={handleSignOut}>Sign Out</SignOut>
        </Header>
        <Search onSearch={handleSearchResults} />{" "}
        {/* Search 컴포넌트에 검색 결과 핸들러 전달 */}
      </HeaderContainer>

      <ButtonContainer>
        <Button onClick={handleWritePost}>Write Post✏️</Button>
        <Button onClick={handleCreateBoard}>Create Board🔨</Button>
      </ButtonContainer>
      {searchResults.length > 0 ? (
        <item.BoardContainer>
          {searchResults.map((post) => (
            <item.BoardItem to={`/post/${post.id}`} key={post.id}>
              <item.BoardTitle>{post.title}</item.BoardTitle>
              <item.BoardBody>{post.body}</item.BoardBody>
              <item.User>{post.createdBy.nickname}</item.User>
            </item.BoardItem>
          ))}
        </item.BoardContainer>
      ) : (
        <Posts />
      )}
    </Container>
  );
}

export default Home;
