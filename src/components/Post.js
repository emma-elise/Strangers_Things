import React from "react";
import Delete from "./delete";
import PostsList from "./PostsList";

const Post = (props) => {
  const { posts, loginStatus, setuserPosts, postList } = props;

  return (
    <div>
      <h3>{posts.title}</h3>
      <div>Location- {posts.location}</div>
      <div>{posts.description}</div>
      <div>Price- {posts.price}</div>
      {loginStatus ? (
        <Delete
          postList={postList}
          setuserPosts={setuserPosts}
          id={posts._id}
        />
      ) : null}
    </div>
  );
};

export default Post;
