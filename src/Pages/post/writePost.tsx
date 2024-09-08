import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { getBoard } from "../../api/board";
import { writePost } from "../../api/post";
import { Board } from "../../type";

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

const BodyInput = styled.input`
  width: 500px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.InputContainer};
  border-radius: 5px;
  font-weight: 400;
  font-size: 15px;
  border: none;
  height: 200px;
  padding-bottom: 170px;
  box-sizing: border-box;

  ::placeholder {
    color: #bababa;
  }
`;

const TagInput = styled.input`
  width: 500px;
  height: 40px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.InputContainer};
  border-radius: 5px;
  font-weight: 400;
  font-size: 15px;
  border: none;
  margin-top: 10px;
  box-sizing: border-box;

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

const BoardSelect = styled.select`
  width: 500px;
  height: 40px;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.InputContainer};
  font-weight: 600;
  font-size: 18px;
  font-family: "Pretendard";
  border: none;
  margin-bottom: 10px;

  option {
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.InputContainer};
  }
`;

const WritePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const boardResponse = await getBoard();
        setBoards(boardResponse.list);
      } catch (error) {
        console.error("Failed to fetch boards:", error);
      }
    };

    fetchBoards();
  }, []);

  const handlePost = async () => {
    if (!selectedBoardId) {
      console.error("No board selected");
      return;
    }

    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const postData = {
      title: title,
      body: content,
      tags: tagArray,
    };

    try {
      const response = await writePost(selectedBoardId, postData);
      console.log("Post creation successful:", response);
      navigate(`/home`);
    } catch (error: any) {
      console.error("Error creating post:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  };

  return (
    <InputContainer>
      <BoardSelect
        value={selectedBoardId}
        onChange={(e) => setSelectedBoardId(e.target.value)}
      >
        <option value="">Select Board</option>
        {boards.map((board) => (
          <option key={board.id} value={board.id}>
            {board.title}
          </option>
        ))}
      </BoardSelect>
      <TitleInput
        type="text"
        placeholder="Write Title Here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <BodyInput
        type="text"
        placeholder="Write Content Here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <TagInput
        type="text"
        placeholder="Write Tag Here(divide by comma)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <Post onClick={handlePost}>Post</Post>
    </InputContainer>
  );
};

export default WritePost;
