import React from 'react';
import Post from './Post';

const PostsList = ({postList, loginStatus}) => {
    return <div>
        <h1> POSTS </h1>
        {postList.map((post)=> 
        {return <Post loginStatus={loginStatus} key={post._id} posts={post} />
        })}
    </div>
}

export default PostsList;