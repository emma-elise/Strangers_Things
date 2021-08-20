import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { fetchPosts } from './api';
import Post from './components/Post';
 

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

    return <div>
        <h1> Test html </h1>
        {postList.map((post)=> 
        {return <Post key={post._id} posts={post} />
        })}

    </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);
