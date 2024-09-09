import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { api } from "../../api/axios";
import { getPostsByBoard } from "../../api/post";
import { Post } from "../../type";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoardTitle = styled.div`
  font-size: 25px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  color: ${({ theme }) => theme.text};
  margin-top: 20px;
  margin-bottom: 10px;
`;

const BoardCreator = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  color: ${({ theme }) => theme.text};
  margin-top: 5px;
`;
const PostItem = styled(Link)`
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

const PostTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  line-height: 15px;
  text-align: left;
  color: ${({ theme }) => theme.text};
  margin-left: 20px;
  margin-right: 9px;
  padding-top: 20px;
`;

const PostBody = styled.div`
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

const DeleteBoardButton = styled.button`
  border-radius: 0;
  border-color: ${({ theme }) => theme.buttonBorder};
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
`;

const BoardPage = () => {
  const { boardUuid } = useParams<{ boardUuid: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postCount, setPostCount] = useState<number>(0);
  const [boardTitle, setBoardTitle] = useState<string>("");
  const [boardCreator, setBoardCreator] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoard = async () => {
      if (!boardUuid) {
        console.error("boardUuid is not defined.");
        return;
      }
      try {
        const postsData = await getPostsByBoard(boardUuid);
        console.log(postsData);
        setPosts(postsData.list || []);
        setPostCount(postsData.count || 0);

        if (postsData.board) {
          setBoardTitle(postsData.board.title);
          setBoardCreator(postsData.board.creator?.nickname || "Unknown");
        } else if (
          postsData.list &&
          postsData.list.length > 0 &&
          postsData.list[0].board
        ) {
          const boardInfo = postsData.list[0].board;
          setBoardTitle(boardInfo.title);
          setBoardCreator(boardInfo.creator?.nickname || "Unknown");
        } else {
          console.error("Board information not found in the response");
          setBoardTitle("Unknown Board");
          setBoardCreator("Unknown Creator");
        }
      } catch (error) {
        console.error("Error in fetchBoardAndPosts:", error);
      }
    };

    fetchBoard();
  }, [boardUuid]);

  const handleDeleteBoard = async () => {
    if (window.confirm("Do you want to delete this board?")) {
      try {
        await api.delete(`/boards/${boardUuid}`);
        alert("Board deleted successfully");
        navigate("/home");
      } catch (error) {
        console.error("Error in handleDeleteBoard:", error);
        alert("Failed to delete board.");
      }
    }
  };

  return (
    <div>
      {postCount === 0 ? (
        <div>No posts found.</div>
      ) : (
        <BoardContainer>
          <BoardTitle>{boardTitle}</BoardTitle>
          <BoardCreator>created by {boardCreator}</BoardCreator>
          {posts.map((post) => (
            <PostItem key={post.id} to={`/post/${post.id}`}>
              <PostTitle>{post.title}</PostTitle>
              <PostBody>{post.body}</PostBody>
              <User>{post.createdBy.nickname}</User>
            </PostItem>
          ))}

          <DeleteBoardButton onClick={handleDeleteBoard}>
            Delete Board
          </DeleteBoardButton>
        </BoardContainer>
      )}
    </div>
  );
};

export default BoardPage;
