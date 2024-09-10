import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteImage, deletePost } from "src/api/post";
import styled from "styled-components";

import { api } from "../../api/axios";
import { Post } from "../../type";

const Container = styled.div`
  width: 500px;
  margin-top: 70px;
  align-items: center;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const EditButton = styled.button`
  border-radius: 0;
  border-color: ${({ theme }) => theme.buttonBorder};
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  margin-top: 30px;
  margin-right: auto;
`;

const DeleteButton = styled.button`
  border-radius: 0;
  border-color: ${({ theme }) => theme.buttonBorder};
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  margin-top: 30px;
  margin-left: auto;
`;

const Img = styled.div`
  width: 500px;
  height: 300px;
  margin-top: 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

function Board() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () =>
      api.get<Post>(`/posts/${id}`).then((res) => {
        return res.data;
      }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load posts.</div>;
  if (!post) return <div>No posts found.</div>;

  const handleDelete = async () => {
    if (window.confirm("Do you want to delete this post?")) {
      try {
        const Id = post.id;
        const imageId = post.images[0]?.id;
        if (imageId) {
          await deleteImage(Id, imageId);
        }
        await deletePost(Id);
        alert("Post deleted");
        navigate("/home");
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  const handleEdit = async () => {
    navigate(`/edit-post/${id}`);
  };

  return (
    <Container>
      <BoardTitle>{post.board.title}</BoardTitle>
      <Title>{post.title}</Title>
      <UserId>Written by {post.createdBy.nickname}</UserId>
      <Body>{post.body}</Body>
      {post.images && post.images.length > 0 ? (
        <Img>
          <img
            src={`data:image/png;base64,${post.images[0].image}`}
            alt="Post Image"
          />
        </Img>
      ) : null}
      <Tags>
        Tags [
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag},</Tag>
        ))}{" "}
        ]
      </Tags>
      <ButtonContainer>
        <EditButton onClick={handleEdit}>Edit</EditButton>
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      </ButtonContainer>
    </Container>
  );
}

export default Board;
