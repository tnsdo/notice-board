import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const BoardPage = () => {
  const { boardUuid } = useParams<{ boardUuid: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postCount, setPostCount] = useState<number>(0);
  const [boardTitle, setBoardTitle] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      if (!boardUuid) {
        console.error("boardUuid가 없습니다.");
        return;
      }
      try {
        const data = await getPostsByBoard(boardUuid);
        setPosts(data.list);
        setPostCount(data.count);
        if (data.list.length > 0) {
          setBoardTitle(data.list[0].board.title);
        }
      } catch (error) {
        console.error("게시물 가져오기 오류:", error);
      }
    };
    fetchPosts();
  }, [boardUuid]);

  return (
    <div>
      {postCount === 0 ? (
        <div>No posts found.</div>
      ) : (
        <BoardContainer>
          <BoardTitle>{boardTitle}</BoardTitle>
          {posts.map((post) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <PostItem key={post.id} to={`/post/${post.id}`}>
                <PostTitle>{post.title}</PostTitle>
                <PostBody>{post.body}</PostBody>
                <User>{post.createdBy.nickname}</User>
              </PostItem>
            </Link>
          ))}
        </BoardContainer>
      )}
    </div>
  );
};

export default BoardPage;
