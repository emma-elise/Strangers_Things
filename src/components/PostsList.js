import React from 'react';
import Post from './Post';

const PostsList = ({postList, loginStatus, postList, setPostList}) => {
    return <div>
        <h1> POSTS </h1>
        {postList.map((post)=> 
        {return <Post postList ={postList} setPostList ={setPostList} loginStatus={loginStatus} key={post._id} posts={post} />
        })}
    </div>
}

export default PostsList;