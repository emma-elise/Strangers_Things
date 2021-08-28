import React from "react";
import Delete from "./delete";
import styled from "styled-components";
import NewMessage from "./NewMessage";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

const PostContainer = styled.div`
  background-color: #c197d2;
`;

const Post = (props) => {
  const {
    posts: { title, location, description, price, _id, author },
    userLoggedIn,
    setuserPosts,
    postList,
    setPostList,
    mainPageList,
    userId
  } = props;
  return (
    <PostContainer>
      <h3>{title}</h3>
      <div>Location: {location}</div>
      <div>{description}</div>
      <div>Price: {price}</div>
      <div>Post ID: {_id}</div>
      <div>Author: {author.username} </div>
      {userLoggedIn?<Route exact path={'/'}  >
        <NewMessage author_id={author._id} userId={userId} post_id={_id}/>
      </Route>:null}
       <Route path = '/posts'>
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
