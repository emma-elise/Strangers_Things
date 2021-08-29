import React from "react";

const Delete = (props) => {
  const { id, postList, setuserPosts, setPostList, mainPageList } =
    props;
  const jwttoken = localStorage.getItem("token");
  const deleteHandler = async (postToDelete) => {
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/posts/${postToDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwttoken}`,
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
