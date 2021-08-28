import axios from "axios";
import Post from "../components/Post";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT";

const loginToken =localStorage.getItem("token");

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
