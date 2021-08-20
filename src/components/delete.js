import React from 'react';


const Delete = (props) => {

    const {loginToken, id, postlist, setPostList} = props
    const deleteHandler = async  (postToDelete) => {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/COHORT-NAME/posts/${postToDelete}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginToken}`
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