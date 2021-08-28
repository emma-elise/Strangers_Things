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

const Container = styled.div`
  background-color: #613659;
  /* height: 100vh; */
  height: 100%;
  overflow: auto;
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

  & > * + * {
    margin-left: 1rem;
  }
`;

const HeaderTopLayerRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > * + * {
    margin-right: 1rem;
  }
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

const Body = styled.div``;

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
    if (localStorage.getItem("token")){
      setUserLoggedIn(true)
    }
    console.log(userData, 'here')
    // fetching user just for testing right now
    fetchUserData()
      .then((val) => {
        setUserData(val);
        setuserPosts(val.data.posts.filter((post) => post.active));
        setUserId(val.data._id);
      })
      .catch((error) => console.error(error));

    //fetch posts to setPostList https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/posts
    //fetch messages to setMessageList? https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/users/me
    //
    //put the token to local storage? (maybe not here) and setLocalToken based off the token in local storage
  }, []);

  const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => setState((state) => !state), []);
    return [state, toggle];
  };

  const [userLoggedIn, setUserLoggedIn] = useToggle();

  // TODO: Look at useEffect for re-rendering pieces of header, etc. upon changes; change header piece into component and pass in userLoggedIn as prop => prop change = re-render

  return (
    <Router>
      <Container>
        <Header>
          <HeaderTopLayer>
            <HeaderTopLayerLeft>
              <Link to="/">Home</Link>
              {!userLoggedIn && <Link to="/posts">Posts</Link>}
              {!userLoggedIn && (
                <Link to="/posts/POST_ID/messages">Messages</Link>
              )}
            </HeaderTopLayerLeft>
            <HeaderTopLayerRight>
              {!userLoggedIn && <Link to="/users/register">Sign Up</Link>}
              {!userLoggedIn && <Link to="/users/login">Login</Link>}
              {userLoggedIn && <Logout setUserLoggedIn={setUserLoggedIn}></Logout>}
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
              setPostList={setPostList}
              userLoggedIn={userLoggedIn}
              userId ={userId}
            ></PostsList>

            {/* My posts page */}

            <NewPost
              setPostList={setPostList}
              userposts={userposts}
              postList={postList}
              setuserPosts={setuserPosts}
            ></NewPost>
          </Route>
        </Body>
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
        <Route exact path="/posts">  
            {userData.data ? (
              <PostsList
                mainPageList={postList}
                postList={userposts}
                userLoggedIn={true}
                setuserPosts={setuserPosts}
                setPostList={setPostList}
              ></PostsList>
              ) : null}</Route>
        <Route path="/messages">
            { userData ? <MessagesList userData={userData}/>: null}
        </Route>
        <Route exact path="/">
          {/* <Home /> */}
        </Route>
        <Route path="*">
          <h1>404 Error - Page Not Found!</h1>
        </Route>
      </Switch>
      </Container>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
