import React from 'react';


const Delete = (props) => {

    const {loginToken, id} = props
    const deleteHandler = async  (postToDelete) => {
        const response = await fetch('https://strangers-things.herokuapp.com/api/COHORT-NAME/posts/5e8d1bd48829fb0017d2233b', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginToken}`
        }
        })
    }
    return <button type="button" className= "btn btn-delete"
    onClick= { ()=> deleteHandler(id)}></button>

}


export default Delete;