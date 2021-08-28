import axios from "axios";
import Post from "../components/Post";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT";

const loginToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTIxMDg1ZDZjYzIzNDAwMTcxN2ExYzAiLCJ1c2VybmFtZSI6InN1cGVybWFuc0JvZHlnYXVyZHMiLCJpYXQiOjE2Mjk1NTQ3ODF9.TGH8VtdQ1VrdlW1HMjhKpBqJr2BL_y9oPkLrAitqP2o";

async function checkLogin() {
  if (localStorage.getItem("loginToken")) {
    return JSON.parse(localStorage.getItem("loginToken"));
  }
}

async function fetchPosts() {
  const url = `${BASE_URL}/posts`;

  try {
    const response = await fetch(url);
    const obj = await response.json();
    const posts = obj.data.posts;
    console.log(posts);
    return posts;
  } catch (error) {
    throw error;
  }
}

async function fetchUserData(LoggedinToken) {
  const url = `${BASE_URL}/users/me`;
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginToken}`,
    },
  };
  try {
    const response = await fetch(url, headers);
    const obj = await response.json();
    return obj;
  } catch (error) {
    throw error;
  }
}

export default BASE_URL;
export { checkLogin, fetchPosts, fetchUserData };
