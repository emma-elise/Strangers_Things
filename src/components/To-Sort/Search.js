import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
// import FontAwesomeIcon from "@fortawesome/react-fontawesome";

// import { FontAwesomeIcon } from "@fontwesome/react-fontawesome";

const SearchBar = styled.section`
  font-family: "ABeeZee", sans-serif;
  font-size: 18px;
  padding: 0.5em;
  background: #211522;
  color: #fff;
  text-align: center;
  border-radius: 6px 6px 6px 6px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  height: 3rem;
  font-size: 1.5rem;
`;

const Search = (props) => {
  const { postList, setPostList } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const resettingRef = useRef(false);
  const reset = (e) => {
    resettingRef.current = true;
    setSearchTerm(e);
  };
  useEffect(() => {
    if (resettingRef.current) {
      resettingRef.current = false;
      searchHandler();
    }
  }, [searchTerm]);

  const searchHandler = () => {
    const newPostList = postList.filter((post) => {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setPostList(newPostList);
  };

  return (
    <SearchBar>
      <form>
        <div>
          <label>Search </label>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              reset(e.target.value);
            }}
          />
        </div>
      </form>
    </SearchBar>
  );
};

export default Search;
