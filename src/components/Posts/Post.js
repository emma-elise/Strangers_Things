import React from "react";
import Delete from "../Delete/delete";
import PostsList from "./PostsList";

const Post = (props) => {
  const {
    posts: { title, location, description, price, _id },
    userLoggedIn,
    setuserPosts,
    postList,
    setPostList,
    mainPageList,
  } = props;
  return (
    <div>
      <h3>{title}</h3>
      <div>Location- {location}</div>
      <div>{description}</div>
      <div>Price- {price}</div>
      {userLoggedIn ? (
        <Delete
          postList={postList}
          setuserPosts={setuserPosts}
          id={_id}
          setPostList={setPostList}
          mainPageList={mainPageList}
        />
      ) : null}
    </div>
  );
};

export default Post;
