import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { api } from "../../api/axios";

interface Creator {
  id: string;
  nickname: string;
  createdAt: string;
}

interface Board {
  id: string;
  title: string;
  createdAt: string;
  creator: Creator;
}

interface BoardResponse {
  count: number;
  list: Board[];
}

const BoardTitle = styled.div`
  font-size: 17px;
  font-weight: 500;
  padding: 10px;
  color: ${({ theme }) => theme.text};
  margin: 20px;
`;

const GetBoard = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [boardCount, setBoardCount] = useState(0);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await api.get<BoardResponse>("/boards");
        setBoards(response.data.list);
        setBoardCount(response.data.count);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchBoards();
  }, []);

  return (
    <div>
      {boardCount === 0 ? (
        <div>No boards found</div>
      ) : (
        <ul>
          {boards.map((board) => (
            <li key={board.id}>
              <Link to={`/board/${board.id}`}>
                <BoardTitle>{board.title}</BoardTitle>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetBoard;
