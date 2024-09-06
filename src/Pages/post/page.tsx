import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { api } from "../../api/axios";
import { Post } from "../../type";

const Container = styled.div`
  width: 500px;
  margin-top: 30px;
`;
const BoardTitle = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 26px;
  font-weight: 400;
  line-height: 30px;
  text-align: center;
  padding-bottom: 25px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 26px;
  font-weight: 600;
  line-height: 30px;
  text-align: left;
  padding-bottom: 10px;
`;

const Body = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;
`;

const UserId = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;
  color: ${({ theme }) => theme.boardItem};
  padding-bottom: 10px;
`;

const Tags = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  gap: 5px;
  margin-top: 30px;
  font-weight: 500;
  font-size: 16px;
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.tagBackground};
  color: ${({ theme }) => theme.tagText};
  font-size: 14px;
  font-weight: 400;
  text-align: left;
`;

function Board() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get<Post>(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError("Error fetching post");
      }
    };

    fetchPost();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <Container>
      <BoardTitle>{post.board.title}</BoardTitle>
      <Title>{post.title}</Title>
      <UserId>Written by {post.createdBy.nickname}</UserId>
      <Body>{post.body}</Body>
      <Tags>
        Tags [
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag},</Tag>
        ))}
        ]
      </Tags>
    </Container>
  );
}

export default Board;
