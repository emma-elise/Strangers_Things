import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { fetchPosts, fetchUserData } from "./api";
import PostsList from "./components/Posts/PostsList";
import NewPost from "./components/Posts/NewPost";
import Register from "./components/Authorization/Register";
import Login from "./components/Authorization/Login";
import Search from "./components/Posts/SearchPosts";
import Logout from "./components/Authorization/Logout";
import styled from "styled-components";
import MessagesList from "./components/Messages/MessagesList";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  grid-template-columns: auto minmax(0, 1fr);
  height: 100vh;
  max-height: 100%;
  position: relative;
`;

const Header = styled.header`
  grid-row: 1;
  grid-column: 1 / 3;
  font-family: "Akaya Telivigala", cursive;
  font-weight: 900;
  font-style: italic;
  font-size: 48px;
  text-align: center;
  padding: 0.25em 0;
  background: #211522;
  color: #fafafa;
`;

const LeftDrawer = styled.div`
  grid-row: 2;
  grid-column: 1;
  display: flex;
  background: #613659;
  ${(props) => {
    if (props.toggle) {
    }
  }}
  transition: width 0.5s ease, background 0.5s ease;
  width: 64px;
  flex-direction: column;
  padding: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  :hover {
    width: 80px;
    background: #d3b1c2;
  }
`;

const Button = styled.div`
  padding: 0.75rem;
  background: #1b1b1b;
  color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  font-family: "ABeeZee", sans-serif;
  border-radius: 6px;
  margin: 8px;
`;

const Body = styled.div`
  grid-row: 2;
  grid-column: 2;
  background: #c197d2;
  font-size: 16px;
  padding: 8px;
  display: grid;
  grid-gap: 8px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const App = () => {
  const [masterPostList, setMasterPostList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [userData, setUserData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userposts, setuserPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchPosts()
      .then((val) => {
        setMasterPostList(val);
        setPostList(val);
      })
      .catch((error) => console.error(error));
    if (localStorage.getItem("token")) {
      setUserLoggedIn(true);
      fetchUserData(localStorage.getItem("token"))
        .then((val) => {
          setUserData(val);
          setuserPosts(val.data.posts.filter((post) => post.active));
          setUserId(val.data._id);
        })
        .catch((error) => console.error(error));
    }
  }, []);
  useEffect(
  ()=>{console.log(userposts,'here')},
  [userposts]
  )
  return (
    <Router>
      <Container>
        <Header>Stranger's Things</Header>
        <LeftDrawer>
          <Button>
            <Link to="/">
              <HomeRoundedIcon style={{ color: "white", fontSize: 30 }} />
            </Link>
          </Button>
          {userLoggedIn && (
            <Button>
              <Link to="/profile/posts/new">
                <AddCircleRoundedIcon
                  style={{ color: "white", fontSize: 30 }}
                />
              </Link>
            </Button>
          )}
          {userLoggedIn && (
            <Button>
              <Link to="/profile">
                <LibraryBooksRoundedIcon
                  style={{ color: "white", fontSize: 30 }}
                />
              </Link>
            </Button>
          )}
          {userLoggedIn && (
            <Button>
              <Link to="/messages">
                <ChatRoundedIcon style={{ color: "white", fontSize: 30 }} />
              </Link>
            </Button>
          )}
          {!userLoggedIn && (
            <Button>
              <Link to="/users/login">
                <LockOpenRoundedIcon style={{ color: "white", fontSize: 30 }} />
              </Link>
            </Button>
          )}
          {userLoggedIn && <Logout />}
        </LeftDrawer>
        <Body>
          <div>
            <Search postList={masterPostList} setPostList={setPostList} />
          </div>
          <Route exact path="/">
            <PostsList
              mainPageList={postList}
              postList={postList}
              setPostList={setPostList}
              userLoggedIn={userLoggedIn}
              setuserPosts={setuserPosts}
              userId={userId}
            ></PostsList>
          </Route>

          <Switch>
            <Route path="/users/register">
              <Register
                setUserLoggedIn={setUserLoggedIn}
                setUserId={setUserId}
                setuserPosts={setuserPosts}
                setUserData={setUserData}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
              ></Register>
            </Route>
            <Route path="/users/login">
              <Login
                setUserLoggedIn={setUserLoggedIn}
                setUserId={setUserId}
                setuserPosts={setuserPosts}
                setUserData={setUserData}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
              ></Login>
            </Route>
            <Route path="/profile/posts/new">
              <NewPost
                setPostList={setPostList}
                userposts={userposts}
                postList={postList}
                setuserPosts={setuserPosts}
              ></NewPost>
            </Route>
            <Route path="/profile">
              <PostsList
                mainPageList={postList}
                postList={userposts}
                userLoggedIn={userLoggedIn}
                setuserPosts={setuserPosts}
                setPostList={setPostList}
                userId={userId}
              ></PostsList>
            </Route>
            <Route path="/messages">
              <div>
                {userData ? <MessagesList userData={userData} /> : null}
              </div>
            </Route>
            <Route exact path="/"></Route>
            <Route path="*">
              <h1>404 Error - Page Not Found!</h1>
            </Route>
          </Switch>
        </Body>
      </Container>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
