import React, { useState } from "react";
import { searchTag } from "src/api/tag";
import { PostResponse } from "src/type";
import styled from "styled-components";

import { searchPost } from "../../api/post";

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 14px;
  gap: 20px;
  padding: 10px 0 10px;
  z-index: 1000;
  background-color: ${({ theme }) => theme.background};
`;

const SelectType = styled.select`
  border-radius: 0;
  border-color: ${({ theme }) => theme.buttonBorder};
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  padding: 0 15px;
  height: 37px;
`;

const SearchInput = styled.input`
  width: 490px;
  height: 37px;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.signContainer};
  font-weight: 500;
  font-size: 18px;
  border: none;
`;

const SearchButton = styled.button`
  border-radius: 0;
  border-color: ${({ theme }) => theme.buttonBorder};
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 15px;
  height: 37px;
`;

function Search({
  onSearch,
}: {
  onSearch: (results: PostResponse["list"]) => void;
}) {
  const [searchType, setSearchType] = useState("post");
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = async () => {
    if (searchType === "post") {
      const postResults = await searchPost(searchInput);
      onSearch(postResults.list);
    } else if (searchType === "tag") {
      const tagResults = await searchTag(searchInput);
      const postResults = await searchPost(tagResults.list.key);
      onSearch(postResults.list);
    }
    //tag search는 뭐지....?
  };

  return (
    <SearchContainer>
      <SelectType
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="post">Post</option>
        <option value="tag">Tag</option>
      </SelectType>
      <SearchInput
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search here..."
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchContainer>
  );
}

export default Search;
