import React, { useState } from "react";
import axios from "axios";

const NewPost = (props) => {
  const { setuserPosts, setPostList, postList, userposts } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState("");
  const token = localStorage.getItem("token");

  const validationHandler = () => {
    if (title.length > 0 && description.length > 0 && price.length > 0) {
      return true;
    }
    return false;
  };
  const postHandler = async (event) => {
    event.preventDefault();

    const body = JSON.stringify({
      post: {
        title: title,
        description: description,
        price: price,
        willDeliver: willDeliver,
      },
    });

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        "https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/posts",
        body,
        headers
      )
      .then((response) => {
        const post = response.data.post;
        setuserPosts([post, ...userposts]);
        setPostList([post, ...postList]);
        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setWillDeliver("");
      })
      .catch((error) => {
        console.log(error.response);
      });

    // if (validationHandler()) {
    //   try {
    //     const response = await fetch(
    //       "https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/posts",
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify({
    //           post: {
    //             title: title,
    //             description: description,
    //             price: price,
    //             ...(location && { location: location }),
    //             ...(willDeliver && { willDeliver: willDeliver }),
    //           },
    //         }),
    //       }
    //     );

    //     const obj = await response.json();
    //     const post = obj.data.post;
    //     setuserPosts([post, ...userposts]);
    //     setPostList([post, ...postList]);
    //     setTitle("");
    //     setDescription("");
    //     setPrice("");
    //     setLocation("");
    //     setWillDeliver("");
    //     console.log(obj.data.post);
    //   } catch (error) {
    //     throw error;
    //   }
    // } else {
    //   alert("Please Fill Out Form");
    // }
    // Check that the user entered stuff into the inputs
    // Validate data
    // Make a ajax request to the backend
    // Backend will return a response letting us know if the user was authenticated or not

    // setSubmitForm(true);
  };
  return (
    <section className="NewPost">
      {<h1>NewPost</h1>}
      <form onSubmit={postHandler}>
        <div>
          <label>Title </label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description </label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price </label>
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Location </label>
          <input
            type="text"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Will Deliver?</label>
          <input
            type="text"
            placeholder="Will Deliver? (optional)"
            value={willDeliver}
            onChange={(e) => setWillDeliver(e.target.value)}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </section>
  );
};

export default NewPost;
