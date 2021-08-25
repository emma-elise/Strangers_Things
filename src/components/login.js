import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { fetchRegisterUser, fetchLoginUser } from "../api";

// const Login = ({ setAuthenticated }) => {

const Login = ({ user }) => {
  const [submitForm, setSubmitForm] = useState(false);
  const userLoggedIn = false;
  // form inputs
  const authenticate = (event) => {
    event.preventDefault();
    fetchRegisterUser(user);

    // Check that the user entered stuff into the inputs
    // Validate data
    // Make a ajax request to the backend
    // Backend will return a response letting us know if the user was authenticated or not
    console.log("form submitted");
    setSubmitForm(true);
  };
  // if (submitForm) return <Redirect to="" />;
  return (
    <section className="login">
      {!userLoggedIn && <h1>Login</h1>}
      <form onSubmit={authenticate}>
        <div>
          <label>Username: </label>
          <input type="text" />
        </div>
        <div>
          <label>Password: </label>
          <input type="text" />
        </div>
        <button type="submit">Login</button>
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
};

export default Login;
