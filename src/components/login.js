import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../api";
import { withRouter } from "react-router";  
import { Link } from "react-router-dom";
import { fetchPosts, fetchUserData } from "../api";

// import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

// TODO: onChange, onSubmit, etc. => identify how to keep username for <h1> after field is cleared

const Login = (props) => {
  const {
    userLoggedIn,
    setUserLoggedIn,
    username,
    setUsername,
    password,
    setPassword,
    showUser,
    setShowUser,
    localUser,
    setLocaluser,
    setUserData,
    setUserId,
    setuserPosts,
    setUserLoggedIn
  } = props;
  // if (localStorage.getItem("token") !== null) userLoggedIn;
  const [formSubmitted, setformsubmitted] = useState(false)
  const loginUser = (event, history) => {
    event.preventDefault();
    console.log("form submitted");
    
    const body = JSON.stringify({
      user: { username: username, password: password },
    });
    const headers = { headers: { "Content-Type": "application/json" } };
    // history.pushState("/");
    // <Link to="/" />;
    axios
      .post(`${BASE_URL}/users/login`, body, headers)
      .then((response) => {
        console.log(response);
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("name", username);
        setformsubmitted(true)
        // this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    
  };
  useEffect(()=>{
  if(formSubmitted){ 
          setUserLoggedIn(true)
          fetchUserData()
          .then((val) => {
          setUserData(val);
          setuserPosts(val.data.posts.filter((post) => post.active));
          setUserId(val.data._id)
          setformsubmitted(false)
          })
        .catch((error) => console.error(error));}},[formSubmitted]
        )

  return (
    <section className="login">
      {!userLoggedIn && localStorage.getItem("token") !== null && (
        <h1>Hello, {localStorage.getItem("name")}</h1>
      )}
      <h1>{showUser}</h1>
      <h3>Login</h3>
      <form onSubmit={loginUser}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            required="required"
            value={username}
            onClick={setUserLoggedIn}
            onInput={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onInput={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default withRouter(Login);
