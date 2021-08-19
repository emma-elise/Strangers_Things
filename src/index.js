import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { fetchPosts } from './api';
 

const App = () =>{

    const [postList, setPostList] = useState([])
    const [userData, setUserData] = useState([])
    const [LocalToken, setLocalToken] = useState([])
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
    console.log(postList,'here')

    return <h1> Test html </h1>
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);
