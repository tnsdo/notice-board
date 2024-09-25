import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBoard } from "src/api/board";

import { deletePost } from "../../api/post";
import { getPostsByBoard } from "../../api/post";
import * as style from "../../styles/boardPage";
import { Post } from "../../type";

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
        setPosts(postsData.list);
        setPostCount(postsData.count);

        if (postsData.list.length > 0) {
          const boardInfo = postsData.list[0].board;
          setBoardTitle(boardInfo.title);
          setBoardCreator(boardInfo.creator.nickname);
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
        if (posts.length > 0) {
          for (const post of posts) {
            await deletePost(post.id);
          }
        }
        await deleteBoard(boardUuid as string);
        alert("Board deleted successfully");
        navigate("/home");
      } catch (error) {
        console.error("Error in handleDeleteBoard:", error);
        alert("Failed to delete board.");
      }
    }
  };

  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  return (
    <style.Display>
      {postCount === 0 ? (
        <style.BoardCreator>No posts found.</style.BoardCreator>
      ) : (
        <style.BoardContainer>
          <style.BoardTitle>{boardTitle}</style.BoardTitle>
          <style.BoardCreator>created by {boardCreator}</style.BoardCreator>
          {posts.map((post) => (
            <style.PostItem
              key={post.id}
              onClick={() => handlePostClick(post.id)}
            >
              <style.PostTitle>{post.title}</style.PostTitle>
              <style.PostBody>{post.body}</style.PostBody>
              <style.User>{post.createdBy.nickname}</style.User>
            </style.PostItem>
          ))}
        </style.BoardContainer>
      )}
      <style.DeleteBoardButton onClick={handleDeleteBoard}>
        Delete Board
      </style.DeleteBoardButton>
    </style.Display>
  );
};

export default BoardPage;
