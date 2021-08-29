import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
`;

const Content = styled.div`
  font-family: "ABeeZee", sans-serif;
  width: 480px;
  padding: 12px;
  min-height: 200px;
  background: #d3b1c2;
  box-shadow: 0 2px 12px -8px black;
  border-radius: 5%;
`;

const Heading = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 24px;
  /* margin-bottom: 6px; */
  /* padding-bottom: 6px; */
  border-bottom: 1px solid #888;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 12px 0 4px;
`;

const Input = styled.input`
  height: 1.5rem;
  background: #ddd;
  width: 460px;
  padding: 8px;
  font-size: 22px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const FooterButton = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-radius: 6px;
  box-shadow: 0 2px 6px -2px black;
  background-color: black;
  justify-content: space-around;
  align-items: center;
  height: 36px;
  width: 100px;

  a:visited {
    color: white;
  }
`;

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
    <Modal>
      <Content>
        <section className="NewPost">
          <Heading>{<h3>New Post</h3>}</Heading>
          <Form>
            <form onSubmit={postHandler}>
              <div>
                <Label>Title </Label>
                <Input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label>Description </Label>
                <Input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <Label>Price </Label>
                <Input
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <Label>Location </Label>
                <Input
                  type="text"
                  placeholder="Location (optional)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <Label>Will Deliver?</Label>
                <Input
                  type="text"
                  placeholder="Will Deliver? (optional)"
                  value={willDeliver}
                  onChange={(e) => setWillDeliver(e.target.value)}
                />
              </div>
              <Footer>
                <FooterButton>
                  <CloseRoundedIcon
                    style={{ color: "white", fontSize: 30 }}
                  ></CloseRoundedIcon>{" "}
                  <Link
                    to="/"
                    style={{ textDecoration: "none" }}
                    className="btn btn-primary"
                    onClick={() => {
                      // window.location.href = "/";
                    }}
                  >
                    Cancel
                  </Link>
                </FooterButton>
                <FooterButton>
                  <CheckRoundedIcon
                    style={{ color: "white", fontSize: 30 }}
                  ></CheckRoundedIcon>
                  <Link
                    to="/"
                    style={{ textDecoration: "none" }}
                    className="btn btn-primary"
                    onClick={() => {
                      NewPost();
                      // window.location.href = "/";
                    }}
                  >
                    Submit
                  </Link>
                  {/* <button type="submit">Submit</button> */}
                </FooterButton>
              </Footer>
            </form>
          </Form>
        </section>
      </Content>
    </Modal>
  );
};

export default NewPost;
