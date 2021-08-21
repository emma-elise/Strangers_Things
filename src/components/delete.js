import React from 'react';


const Delete = (props) => {
    const jwttoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTIxMDg1ZDZjYzIzNDAwMTcxN2ExYzAiLCJ1c2VybmFtZSI6InN1cGVybWFuc0JvZHlnYXVyZHMiLCJpYXQiOjE2Mjk1NTQ3ODF9.TGH8VtdQ1VrdlW1HMjhKpBqJr2BL_y9oPkLrAitqP2o'
    const {loginToken, id, postlist, setPostList} = props
    const deleteHandler = async  (postToDelete) => {
        const response = await fetch(`  https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/posts/${postToDelete}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwttoken}`
            //will be login token in the future to jwttoken
        }})
        const data = await response.json();
        console.log(data,'data')
        if(data){
            const newPosts  = postlist.filter((post)=>{
                return post._id !==postToDelete
            })
            setPostList(newPosts)
        }
    }
    return <button type="button" className= "btn btn-delete"
    onClick= { ()=> deleteHandler(id)}></button>

}


export default Delete;