import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { fetchPosts } from './api';
import PostsList from './components/PostsList';

 

const App = () =>{

    const [postList, setPostList] = useState([])
    const [userData, setUserData] = useState([])
    const [LocalToken, setLocalToken] = useState([])
    const [loginStatus, setLoginStatus] = useState(false)
    useEffect( ()=>{
       fetchPosts()
       .then((val)=>{
           setPostList(val)
       })
       .catch((error)=>console.error(error))


    //fetch posts to setPostList https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/posts
    //fetch messages to setMessageList? https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/users/me
    //
    //put the token to local storage? (maybe not here) and setLocalToken based off the token in local storage
    },[]
    )
    return <div className="app">
    {/* for the main page, there will be another PostsList comp used for Users posts */}
    <PostsList postList = {postList} loginStatus={loginStatus}></PostsList>
    </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);
