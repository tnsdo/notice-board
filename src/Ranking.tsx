import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const RankingContainer = styled.div`
  margin-top: 20px;
  width: 80%;
`;

const RankingTitle = styled.h3`
  font-family: "Rubik Bubbles", system-ui;
  color: #333;
`;

const RankingList = styled.ol`
  list-style-type: none;
  padding: 0;
`;

const RankingItem = styled.li`
  font-family: "Rubik Bubbles", system-ui;
  margin-bottom: 5px;
`;

interface User {
  name: string;
  clickCount: number;
}

const Ranking: React.FC = () => {
  const [topUsers, setTopUsers] = useState<User[]>([]);

  const updateRanking = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const sortedUsers = users
      .sort((a: User, b: User) => (b.clickCount || 0) - (a.clickCount || 0))
      .slice(0, 5);
    setTopUsers(sortedUsers);
  };

  useEffect(() => {
    updateRanking();
    
    // 이벤트 리스너 추가
    window.addEventListener('updateRanking', updateRanking);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('updateRanking', updateRanking);
    };
  }, []);

  return (
    <RankingContainer>
      <RankingTitle>Top 5 Clickers</RankingTitle>
      <RankingList>
        {topUsers.map((user, index) => (
          <RankingItem key={index}>
            {user.name}: {user.clickCount || 0} clicks
          </RankingItem>
        ))}
      </RankingList>
    </RankingContainer>
  );
};

export default Ranking;