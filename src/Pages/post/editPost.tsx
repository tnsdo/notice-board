import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPost } from "src/api/post";
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

const Title = styled.input`
  width: 500px;
  height: 40px;
  border-radius: 5px;
  border-width: 1px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.InputContainer};
  font-weight: 600;
  font-size: 23px;
  font-family: "Pretendard";
`;

const Body = styled.input`
  width: 500px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.InputContainer};
  border-radius: 5px;
  font-weight: 400;
  font-size: 15px;
  border-width: 1px;
  height: 200px;
  padding-bottom: 170px;
  box-sizing: border-box;
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
  flex-direction: row;
  align-items: center;
`;

const Tag = styled.input`
  width: 500px;
  height: 40px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.InputContainer};
  border-radius: 5px;
  font-weight: 400;
  font-size: 15px;
  border-width: 1px;
  margin-left: 5px;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SaveButton = styled.button`
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

function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [editTitle, setEditTitle] = useState({ title: "" });
  const [editBody, setEditBody] = useState({ body: "" });
  const [editTag, setEditTag] = useState("");

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () =>
      api.get<Post>(`/posts/${id}`).then((res) => {
        setEditTitle({ title: res.data.title });
        setEditBody({ body: res.data.body });
        setEditTag(res.data.tags.join(", "));
        return res.data;
      }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load posts.</div>;
  if (!post) return <div>No posts found.</div>;

  const handleSave = async () => {
    const id = post.id;
    const postData = {
      title: editTitle.title,
      body: editBody.body,
      tags: editTag.split(",").map((tag) => tag.trim()),
    };

    try {
      await editPost(id, postData);
      alert("Post edited");
      navigate("/home");
    } catch (error) {
      console.error("Failed to edit post:", error);
    }
  };

  return (
    <Container>
      <BoardTitle>{post.board.title}</BoardTitle>
      <Title
        type="text"
        value={editTitle.title}
        onChange={(e) => setEditTitle({ title: e.target.value })}
      />
      <UserId>Written by {post.createdBy.nickname}</UserId>
      <Body
        type="text"
        value={editBody.body}
        onChange={(e) => setEditBody({ body: e.target.value })}
      />
      {post.images && post.images.length > 0 ? (
        <Img>
          <img
            src={`data:image/png;base64,${post.images[0].image}`}
            alt="Post Image"
          />
        </Img>
      ) : null}
      <Tags>
        Tag
        <Tag
          type="text"
          value={editTag}
          onChange={(e) => setEditTag(e.target.value)}
        />
      </Tags>
      <ButtonContainer>
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </ButtonContainer>
    </Container>
  );
}

export default EditPost;
