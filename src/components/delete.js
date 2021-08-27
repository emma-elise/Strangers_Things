import React from "react";

const Delete = (props) => {
  const { loginToken, id, postList, setuserPosts, setPostList, mainPageList } =
    props;
  const jwttoken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTIxMDg1ZDZjYzIzNDAwMTcxN2ExYzAiLCJ1c2VybmFtZSI6InN1cGVybWFuc0JvZHlnYXVyZHMiLCJpYXQiOjE2Mjk1NTQ3ODF9.TGH8VtdQ1VrdlW1HMjhKpBqJr2BL_y9oPkLrAitqP2o";
  const deleteHandler = async (postToDelete) => {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/posts/${postToDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwttoken}`,
          //will be login token in the future to jwttoken
        },
      }
    );
    const data = await response.json();
    if (data) {
      const newPosts = postList.filter((post) => {
        return post._id !== postToDelete;
      });
      const newMain = mainPageList.filter((post) => {
        return post._id !== postToDelete;
      });
      setuserPosts(newPosts);
      setPostList(newMain);
    }
  };
  return (
    <button
      type="button"
      className="btn btn-delete"
      onClick={() => deleteHandler(id)}
    >
      Delete
    </button>
  );
};

export default Delete;
