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

const fetchRegisterUser = async () => {
  const url = `${BASE_URL}/users/register`;
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    user: {
      username: "",
      password: "",
    },
  });
  try {
    const registerUser = await (await fetch(url, headers, body)).json();
    console.log(registerUser);
    return registerUser;
  } catch (error) {
    throw error;
  }
};

const fetchLoginUser = async () => {
  const url = `${BASE_URL}/users/login`;
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    user: {
      username: "",
      password: "",
    },
  });
  try {
    const loginUser = await (await fetch(url, headers, body)).json();
    return loginUser;
  } catch (error) {
    throw error;
  }
};

export {
  BASE_URL,
  checkLogin,
  fetchPosts,
  fetchUserData,
  fetchRegisterUser,
  fetchLoginUser,
};
