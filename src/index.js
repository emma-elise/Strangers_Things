import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { fetchPosts, fetchUserData } from "./api";
import PostsList from "./components/PostsList";
import NewPost from "./components/NewPost";
import Register from "./components/register";
import Login from "./components/login";
import Search from "./components/To-Sort/Search";
import Logout from "./components/logout";
import styled from "styled-components";

const Header = styled.header`
  background-color: #211522;
  color: white;
  font-size: 1em;
  height: 3rem;
  border-radius: 3px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  & > * + * {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    text-decoration: none;
    font-family: "Akaya Kanadaka";
    font-size: 1.5rem;
  }

  a:visited {
    color: white;
  }
`;

const App = () => {
  const [masterPostList, setMasterPostList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [userData, setUserData] = useState({});
  const [localToken, setLocalToken] = useState([]);
  const [localUser, setLocalUser] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [userposts, setuserPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchPosts()
      .then((val) => {
        setMasterPostList(val);
        setPostList(val);
      })
      .catch((error) => console.error(error));
    // fetching user just for testing right now
    fetchUserData()
      .then((val) => {
        setUserData(val);
        setuserPosts(val.data.posts.filter((post) => post.active));
      })
      .catch((error) => console.error(error));

    //fetch posts to setPostList https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/posts
    //fetch messages to setMessageList? https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/users/me
    //
    //put the token to local storage? (maybe not here) and setLocalToken based off the token in local storage
  }, []);

  return (
    <Router>
      <div>
        <Header>
          <h1>Stranger's Things</h1>
          <Link to="/">Home</Link>
          <Link to="/users/register">Sign Up</Link>
          <Link to="/users/login">Login</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/posts/POST_ID/messages">Messages</Link>
          <Logout></Logout>
        </Header>
        <Switch>
          <Route path="/users/register">
            <Register
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            ></Register>
          </Route>
          <Route path="/users/login">
            <Login
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            ></Login>
          </Route>
          <Route path="/posts"></Route>
          <Route path="posts/POST_ID/messages"></Route>
          <Route exact path="/">
            {/* for the main page, there will be another PostsList comp used for Users posts */}
            <Search postList={masterPostList} setPostList={setPostList} />
            <PostsList
              postList={postList}
              userLoggedIn={userLoggedIn}
              setPostList={setPostList}
            ></PostsList>
            {/* My posts page */}
            {userData.data ? (
              <PostsList
                mainPageList={postList}
                postList={userposts}
                loginStatus={true}
                setuserPosts={setuserPosts}
                setPostList={setPostList}
              ></PostsList>
            ) : null}
            <NewPost
              setPostList={setPostList}
              userposts={userposts}
              postList={postList}
              setuserPosts={setuserPosts}
            ></NewPost>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
