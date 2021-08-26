import React from "react";
import Post from "./Post";

const PostsList = ({ postList, loginStatus, setuserPosts }) => {
  return (
    <div>
      {loginStatus ? <h1> MY POSTS </h1> : <h1> POSTS </h1>}
      {postList.map((post) => {
        return (
          <Post
            postList={postList}
            setuserPosts={setuserPosts}
            loginStatus={loginStatus}
            key={post._id}
            posts={post}
          />
        );
      })}
    </div>
  );
};

export default PostsList;
