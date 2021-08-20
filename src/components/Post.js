import React from 'react';


const Post = (props) =>{
    const {posts} = props
    return <div> 
        <h3>{posts.title}</h3>
        <div>{posts.location}</div>
        <div>{posts.description}</div>
        <div>{posts.price}</div>
         </div>
}

export default Post;