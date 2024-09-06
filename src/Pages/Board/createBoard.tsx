import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { createBoard } from "../../api/board";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const TitleInput = styled.input`
  width: 500px;
  height: 40px;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.InputContainer};
  font-weight: 600;
  font-size: 23px;
  font-family: "Pretendard";
  border: none;

  ::placeholder {
    color: #bababa;
  }
`;

const Post = styled.button`
  border-radius: 0;
  border-color: ${({ theme }) => theme.buttonBorder};
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};
  margin-top: 30px;
  width: 100px;
  right: 10%;
  transform: translateX(400%);
`;

const CreateBoard: React.FC = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleCreateBoard = async () => {
    try {
      const response = await createBoard(title);
      console.log("Board Created:", response);
      navigate(`/home`);
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response && error.response.status === 403) {
        alert("Check your login status");
        navigate("/signin");
      } else if (error.message === "Access token expired") {
        alert(error.message);
        navigate("/signin");
      } else {
        alert("Error occurred");
      }
    }
  };

  return (
    <InputContainer>
      <TitleInput
        type="text"
        placeholder="Write Title Here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Post onClick={handleCreateBoard}>Post</Post>
    </InputContainer>
  );
};

export default CreateBoard;
