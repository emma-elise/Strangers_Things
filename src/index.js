import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { fetchPosts, fetchUserData } from './api';
import PostsList from './components/PostsList';
import NewPost from './components/NewPost';
 

const App = () =>{

    const [postList, setPostList] = useState([])
    const [userData, setUserData] = useState({})
    const [LocalToken, setLocalToken] = useState([])
    const [loginStatus, setLoginStatus] = useState(false)
    const [userposts, setuserPosts]= useState([])

    useEffect( ()=>{
       fetchPosts()
       .then((val)=>{
           setPostList(val)
       })
       .catch((error)=>console.error(error))
       // fetching user just for testing right now
       fetchUserData()
       .then((val)=>{
           setUserData(val)
           setuserPosts(val.data.posts.filter((post)=> post.active))
       })
       .catch((error)=>console.error(error))

       
       
    //fetch posts to setPostList https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/posts
    //fetch messages to setMessageList? https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/users/me
    //
    //put the token to local storage? (maybe not here) and setLocalToken based off the token in local storage
    },[]
    )
    console.log(userposts)
    return <div className="app">
    {/* for the main page, there will be another PostsList comp used for Users posts */}
    <PostsList postList = {postList} loginStatus={loginStatus} setPostList = {setPostList}></PostsList>
    {userData.data ? <PostsList postList = {userposts} loginStatus={true} setuserPosts = {setuserPosts}></PostsList>: null}
    {/* <NewPost />  */}
    </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);
    