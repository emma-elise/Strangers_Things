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

const Container = styled.div`
  background-color: #613659;
  height: 100vh;
`;

const Header = styled.header`
  background-color: #211522;
  color: white;
  font-size: 1em;
  height: 92px;
  border-radius: 3px;
  font-family: "Akaya Kanadaka";

  a:visited {
    color: white;
  }

  a:hover {
    color: #c197d2;
  }
`;

const HeaderTopLayer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-decoration: none;
  font-size: 1.5rem;
  color: white;

  & > * + * {
  }
`;

const HeaderTopLayerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const HeaderTopLayerRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const HeaderBottomLayer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftDrawer = styled.div`
  grid-row: 2;
  grid-column: 1;
  transition: width 0.5s ease, background 0.5s ease;
  width: 64px;
  background-color: #613659;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
`;

const Body = styled.div`
  grid-row: 2;
  grid-column: 2;
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
      <Container>
        <Header>
          <HeaderTopLayer>
            <HeaderTopLayerLeft>
              <Link to="/">Home</Link>
              {userLoggedIn && <Link to="/posts">Posts</Link>}
              {userLoggedIn && (
                <Link to="/posts/POST_ID/messages">Messages</Link>
              )}
            </HeaderTopLayerLeft>
            <HeaderTopLayerRight>
              {userLoggedIn && <Link to="/users/register">Sign Up</Link>}
              {userLoggedIn && <Link to="/users/login">Login</Link>}
              {userLoggedIn && <Logout></Logout>}
            </HeaderTopLayerRight>
          </HeaderTopLayer>
          <HeaderBottomLayer>
            <h1>Stranger's Things</h1>
            <Search postList={masterPostList} setPostList={setPostList} />
          </HeaderBottomLayer>
        </Header>
        <LeftDrawer></LeftDrawer>
        <Body>
          <Route exact path="/">
            {/* for the main page, there will be another PostsList comp used for Users posts */}
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
        </Body>
      </Container>
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
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
