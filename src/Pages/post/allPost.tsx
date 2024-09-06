import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "src/api/post";
import { PostResponse } from "src/type";
import styled from "styled-components";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoardItem = styled(Link)`
  background-color: ${({ theme }) => theme.signContainer};
  height: auto;
  height: 80px;
  width: 500px;
  margin-bottom: 10px;
  border-radius: 15px;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 20px;
  list-style: none;
  text-decoration: none;
  display: block;
`;

const BoardTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  line-height: 15px;
  text-align: left;
  color: ${({ theme }) => theme.text};
  margin-left: 20px;
  margin-right: 9px;
  padding-top: 20px;
`;

const BoardBody = styled.div`
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  color: ${({ theme }) => theme.text};
  margin-left: 20px;
  margin-right: 9px;
  padding-top: 8px;
`;

const User = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  color: ${({ theme }) => theme.text};
  text-align: right;
  margin-right: 10px;
`;

function Post() {
  const [posts, setPosts] = useState<PostResponse>();
  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  if (!posts) return <div>Loading...</div>;

  return (
    <BoardContainer>
      {posts.list.map((post) => (
        <Link to={`/post/${post.id}`} key={post.id}>
          <BoardItem key={post.id} to={`/post/${post.id}`}>
            <BoardTitle>{post.title}</BoardTitle>
            <BoardBody>{post.body}</BoardBody>
            <User>{post.createdBy.nickname}</User>
          </BoardItem>
        </Link>
      ))}
    </BoardContainer>
  );
}

export default Post;
