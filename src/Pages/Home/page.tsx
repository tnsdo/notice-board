import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import api from "../../api/axios";

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

export interface Post {
  id: string;
  title: string;
  body: string;
  tags: string[];
  board: {
    id: string;
    title: string;
    createdAt: string;
    creator: {
      id: string;
      nickname: string;
      createdAt: string;
    };
  };
  createdAt: string;
  createdBy: {
    id: string;
    nickname: string;
    createdAt: string;
  };
  images: {
    image: string;
    id: string;
  }[];
}

interface PostResponse {
  count: number;
  list: Post[];
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostResponse>({ count: 0, list: [] });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get<PostResponse>("/posts");
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {posts.list.length > 0 ? (
        posts.list.map((post) => (
          <BoardItem key={post.id} to={`/board/${post.id}`}>
            <BoardTitle>{post.title}</BoardTitle>
            <BoardBody>{post.body}</BoardBody>
            <User>{post.createdBy.nickname}</User>
          </BoardItem>
        ))
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
}

export default Home;
