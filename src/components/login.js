import axios from "axios";
import React, { useState } from "react";
import BASE_URL from "../api";

// TODO: onChange, onSubmit, etc. => identify how to keep username for <h1> after field is cleared

const Login = (props) => {
  const {
    userLoggedIn,
    username,
    setUsername,
    password,
    setPassword,
    showUser,
    setShowUser,
    localUser,
    setLocaluser,
  } = props;
  // if (localStorage.getItem("token") !== null) userLoggedIn;

  const loginUser = (event) => {
    event.preventDefault();
    console.log("form submitted");
    const body = JSON.stringify({
      user: { username: username, password: password },
    });
    const headers = { headers: { "Content-Type": "application/json" } };
    return axios
      .post(`${BASE_URL}/users/login`, body, headers)
      .then((response) => {
        console.log(response);
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("name", username);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

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
            onInput={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="text"
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

export default Login;
