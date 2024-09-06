import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { api } from "../../api/axios";
import { Board, BoardResponse } from "../../type";

const BoardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
`;

const BoardItem = styled.li`
  margin: 10px;
`;

const BoardTitle = styled.div`
  font-size: 17px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  min-width: 50px;
  margin-right: 10px;
  text-align: center;
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
        <div>No boards found.</div>
      ) : (
        <BoardList>
          {boards.map((board) => (
            <BoardItem key={board.id}>
              <Link to={`/board/${board.id}`}>
                <BoardTitle>{board.title}</BoardTitle>
              </Link>
            </BoardItem>
          ))}
        </BoardList>
      )}
    </div>
  );
};

export default GetBoard;
