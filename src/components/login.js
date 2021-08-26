import axios from "axios";
import React, { Component, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { BASE_URL } from "../api";

// TODO: Work on log in (only register set atm) and log out

const Login = () => {
  const [submitForm, setSubmitForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userLoggedIn = false;
  const authenticateUser = (event) => {
    event.preventDefault();
    console.log("form submitted");
    setSubmitForm(true);
    const body = JSON.stringify({
      user: { username: username, password: password },
    });
    const headers = { headers: { "Content-Type": "application/json" } };
    return axios
      .post(`${BASE_URL}/users/register`, body, headers)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <section className="login">
      {!userLoggedIn && <h1>Login</h1>}
      <form onSubmit={authenticateUser}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onInput={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="text"
            value={password}
            onInput={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
};

export default Login;
