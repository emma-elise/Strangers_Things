import React from 'react';

const Message = (prop) =>{
    const {message}= prop
    return (
       <div>
        <h3>Message: {message.post.title}</h3>
        <div>From: {message.fromUser.username}</div>
        <div>Message: {message.content}</div>
       </div>
    )
}

export default Message;

