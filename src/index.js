import React, { useState, useEffect, useCallback } from "react";
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
import MessagesList from "./components/Messages/MessagesList";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";

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
  /* 
  a:visited {
    color: white;
  }

  a:hover {
    color: #c197d2;
  } */
`;

const SearchBar = styled.div`
  font-family: "ABeeZee", sans-serif;
  font-size: 18px;
  padding: 0.5em;
  background: #211522;
  color: #fff;
  text-align: center;
  border-radius: 6px 6px 6px 6px;
  height: 2.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const HeaderTopLayer = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-decoration: none;
  font-size: 1.5rem;
  color: white; */

  & > * + * {
    /* margin-left: 1rem; */
  }
`;

const HeaderTopLayerLeft = styled.div`
  /* display: flex;
  justify-content: flex-start;
  align-items: center; */

  & > * + * {
    /* margin: 1rem; */
  }
`;

const HeaderTopLayerRight = styled.div`
  /* display: flex;
  justify-content: flex-end;
  align-items: center; */

  & > * + * {
    /* margin: 1rem; */
  }
`;

const HeaderBottomLayer = styled.div`
  /* display: flex;
  justify-content: space-between; */
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

const LeftDrawerOpen = styled.div`
  width: 300px;
  border-radius: unset;
  transition: width 0.5s ease, background 0.5s ease;
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

const ButtonStretched = styled.div`
  width: 284px;
`;

const Icon = styled.div``;

const Body = styled.div`
  grid-row: 2;
  grid-column: 2;
  /* grid-column: 2 / 3; */
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
  const [localToken, setLocalToken] = useState([]);
  const [localUser, setLocalUser] = useState([]);
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

    // fetching user just for testing right now
    //fetch posts to setPostList https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/posts
    //fetch messages to setMessageList? https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/users/me
    //
    //put the token to local storage? (maybe not here) and setLocalToken based off the token in local storage
  }, []);

  return (
    <Router>
      <Container>
        <Header>
          {/* <HeaderTopLayer>
            <HeaderTopLayerLeft>
              {/* {localStorage.getItem("token") !== null && (
                <Link to="/posts">Posts</Link>
              )}
              {localStorage.getItem("token") !== null && (
                <Link to="/posts/POST_ID/messages">Messages</Link>
              )} */}
          {/* {userLoggedIn && <Link to="/posts">Posts</Link>}
              {userLoggedIn && <Link to="/messages">Messages</Link>}
            </HeaderTopLayerLeft> */}
          {/* <HeaderTopLayerRight>
              {localStorage.getItem("token") === null && (
                <Link to="/users/register">Sign Up</Link>
              )}
              {localStorage.getItem("token") === null && (
                <Link to="/users/login">Login</Link>
              )}
              {localStorage.getItem("token") !== null && <Logout></Logout>}
            </HeaderTopLayerRight> */}
          {/* <HeaderTopLayerRight>
              {!userLoggedIn && <Link to="/users/register">Sign Up</Link>}
              {!userLoggedIn && <Link to="/users/login">Login</Link>}
              {userLoggedIn && (
                <Logout setUserLoggedIn={setUserLoggedIn}></Logout>
              )}
            </HeaderTopLayerRight>
          </HeaderTopLayer>
          <HeaderBottomLayer> */}
          Stranger's Things
          {/* <Search postList={masterPostList} setPostList={setPostList} />
          </HeaderBottomLayer> */}
        </Header>
        <LeftDrawer>
          <Button>
            <Link to="/">
              <HomeRoundedIcon style={{ color: "white", fontSize: 30 }} />
            </Link>
          </Button>
          {userLoggedIn && (
            <Button>
              <Link to="/posts/new">
                <AddCircleRoundedIcon
                  style={{ color: "white", fontSize: 30 }}
                />
              </Link>
            </Button>
          )}
          {userLoggedIn && (
            <Button>
              <Link to="/posts">
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
          {userLoggedIn && (
            <Button>
              <LockRoundedIcon style={{ color: "white", fontSize: 30 }} />
              <Logout setUserLoggedIn={setUserLoggedIn}></Logout>
            </Button>
          )}
        </LeftDrawer>
        <Body>
          <SearchBar>
            <Search postList={masterPostList} setPostList={setPostList} />
          </SearchBar>
          <Route exact path="/">
            {/* for the main page, there will be another PostsList comp used for Users posts */}
            <PostsList
              postList={postList}
              setPostList={setPostList}
              userLoggedIn={userLoggedIn} 
              userId={userId}
            ></PostsList>

            {/* My posts page */}

            {/* <NewPost
              setPostList={setPostList}
              userposts={userposts}
              postList={postList}
              setuserPosts={setuserPosts}
            ></NewPost> */}
          </Route>
        
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
          <Route path="/posts/new">

           <NewPost
              setPostList={setPostList}
              userposts={userposts}
              postList={postList}
              setuserPosts={setuserPosts}
            ></NewPost>

          </Route>
          <Route path="/posts">
            <PostsList
              mainPageList={postList}
              postList={userposts}
              userLoggedIn={userLoggedIn}
              setuserPosts={setuserPosts}
              setPostList={setPostList}
              userposts={userposts}
            ></PostsList>
          </Route>
          <Route path="/messages">
            <div>{userData ? <MessagesList userData={userData} /> : null}</div>
          </Route>
          <Route exact path="/">
            {/* <Home /> */}
          </Route>
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
