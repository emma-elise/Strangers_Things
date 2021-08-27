// import axios from "axios";
// import React, { Component, useState } from "react";
// import { Link, Redirect } from "react-router-dom";
// import { BASE_URL } from "../api";

// // TODO: Work on displaying if user is logged on; add logout feature

// const Login = (props) => {
//   const { userLoggedIn, username, password } = props;
//   if (localStorage.getItem("token") !== null) !userLoggedIn;

//   const loginUser = (event) => {
//     event.preventDefault();

//     console.log("form submitted");
//     const body = JSON.stringify({
//       user: { username: username, password: password },
//     });
//     const headers = { headers: { "Content-Type": "application/json" } };
//     return axios
//       .post(`${BASE_URL}/users/login`, body, headers)
//       .then((response) => {
//         console.log(response);
//         const token = response.data.data.token;
//         localStorage.setItem("token", token);
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//       });
//   };

//   return (
//     <section className="login">
//       {userLoggedIn === true && localStorage.getItem("token") !== null && (
//         <h1>User Is Logged In</h1>
//       )}

//       <h3>Login</h3>
//       <form onSubmit={loginUser}>
//         <div>
//           <label>Username: </label>
//           <input
//             type="text"
//             required="required"
//             value={username}
//             onInput={(event) => setUsername(event.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password: </label>
//           <input
//             type="text"
//             value={password}
//             onInput={(event) => setPassword(event.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </section>
//   );
// };

// export default Login;
