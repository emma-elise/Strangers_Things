import React from 'react';
import Delete from './delete';

const Post = (props) =>{
    const {posts, loginStatus} = props
    return <div> 
        <h3>{posts.title}</h3>
        <div>Location- {posts.location}</div>
        <div>{posts.description}</div>
        <div>Price- {posts.price}</div>
        {loginStatus ? <Delete id = {posts._id}/>: null}
         </div>
}

export default Post;