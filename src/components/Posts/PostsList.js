import React from "react";
import Post from "./Post";

const PostsList = ({
  postList,
  userLoggedIn,
  setuserPosts,
  setPostList,
  mainPageList,
}) => {
  return (
    <div>
      {userLoggedIn ? <h1> MY POSTS </h1> : <h1> POSTS </h1>}
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
          />
        );
      })}
    </div>
  );
};

export default PostsList;
