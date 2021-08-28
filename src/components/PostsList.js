import React from "react";
import Post from "./Post";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
const PostsList = ({
  postList,
  userLoggedIn,
  setuserPosts,
  setPostList,
  mainPageList,
  userId
}) => {
  return (
    <div>
      <Route exact path='/'><h1> POSTS </h1></Route>
      <Route path='/posts'><h1> MY POSTS </h1></Route>
      {postList.map((post) => {
        return (
          <Post
            postList={postList}
            setuserPosts={setuserPosts}
            userLoggedIn={userLoggedIn}
            key={post._id}
            posts={post}
            setPostList={setPostList}
            mainPageList={mainPageList}
            userId={userId}
          />
        );
      })}
    </div>
  );
};

export default PostsList;
