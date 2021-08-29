import React from "react";
import Delete from "./delete";
import styled from "styled-components";
import NewMessage from "./NewMessage";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

const PostContainer = styled.div`
  background-color: #c197d2;
  border: 1px solid #211522;
  background: #fafafa;
  box-shadow: 0 3px 8px -3px black;
  /* border-radius: 20%; */
  border-radius: 5%;
  margin: 0.5rem;
`;

const PostTitle = styled.div`
  padding: 8px;
  background: #c197d2;
  display: flex;
  flex-direction: column;
  border-radius: 6px 6px 0 0;
  font-family: "ABeeZee", sans-serif;
`;

const PostContent = styled.div`
  padding: 8px;
  /* border-radius: 6px 6px 0 0; */
`;

const PostMessage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background: #c197d2;
  padding: 8px;
  border-radius: 0 0 6px 6px;
`;

const Post = (props) => {
  const {
    posts: { title, location, description, price, _id, author },
    userLoggedIn,
    setuserPosts,
    postList,
    setPostList,
    mainPageList,
    userId,
  } = props;
  return (
    <PostContainer>
      <PostTitle>
        <h3>{title}</h3>
      </PostTitle>
      <PostContent>
        <div>
          <strong>Location:</strong> {location}
        </div>
        <div>
          <strong>Description:</strong> {description}
        </div>
        <div>
          <strong>Price:</strong> {price}
        </div>
        <div>
          <strong>From:</strong> {author.username}{" "}
        </div>
      </PostContent>
      <PostMessage>
        {userLoggedIn ? (
          <Route exact path={"/"}>
            <NewMessage author_id={author._id} userId={userId} post_id={_id} />
          </Route>
        ) : null}
      </PostMessage>
      <Route path="/posts">
        <Delete
          postList={postList}
          setuserPosts={setuserPosts}
          id={_id}
          setPostList={setPostList}
          mainPageList={mainPageList}
        />
      </Route>
    </PostContainer>
  );
};

export default Post;
