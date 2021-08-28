import axios from "axios";
import React from "react";
import BASE_URL from "../api";
import { Link } from "react-router-dom";

const Register = (props) => {
  const { username, setUsername, password, setPassword } = props;
  // if (localStorage.getItem("token") !== null) userLoggedIn;

  const registerUser = () => {
    // event.preventDefault();
    console.log("form submitted");
    const body = JSON.stringify({
      user: { username: username, password: password },
    });
    const headers = { headers: { "Content-Type": "application/json" } };
    return axios
      .post(`${BASE_URL}/users/register`, body, headers)
      .then((response) => {
        console.log(response);
        const token = response.data.data.token;
        localStorage.setItem("token", token);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <section className="login">
      {localStorage.getItem("token") !== null && <h1>User Is Logged In</h1>}
      <h3>Register</h3>
      <form onSubmit={registerUser}>
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
            type="password"
            value={password}
            onInput={(event) => setPassword(event.target.value)}
          />
        </div>
        <Link
          to="/"
          className="btn btn-primary"
          onClick={() => {
            registerUser();
            window.location.href = "/";
          }}
        >
          Register
        </Link>
      </form>
    </section>
  );
};

export default Register;
