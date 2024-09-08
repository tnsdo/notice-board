import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getPostsByBoard } from "src/api/post";
import { Post } from "src/type";
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

function PostByBoard() {
  const { boardUuid } = useParams<{ boardUuid: string }>();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", boardUuid],
    queryFn: () => getPostsByBoard(boardUuid as string),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load posts.</div>;
  if (!posts) return <div>No posts found.</div>;

  return (
    <BoardContainer>
      {posts.list.map((post: Post) => (
        <BoardItem key={post.id} to={`/post/${post.id}`}>
          <BoardTitle>{post.board.title}</BoardTitle>
          <BoardTitle>{post.title}</BoardTitle>
          <BoardBody>{post.body}</BoardBody>
          <User>{post.createdBy.nickname}</User>
        </BoardItem>
      ))}
    </BoardContainer>
  );
}

export default PostByBoard;
