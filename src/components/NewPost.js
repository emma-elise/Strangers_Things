import React, { useState } from "react";


const NewPost = (props)=>{
    const {loginToken, setuserPosts, setPostList, postList, userposts} = props
    const [submitForm, setSubmitForm] = useState(false);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] =  useState('')
    const [location, setLocation] = useState('')
    const [willDeliver, setWillDeliver] = useState('')
    const userLoggedIn = false
    const validationHandler=() => {
        if(title.length>0 && description.length>0 && price.length>0){
            return true
        }
        return false
    }
    const postHandler = async (event) => {
        event.preventDefault();
        if(validationHandler()){
            console.log("form submitted");
            try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/posts', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTIxMDg1ZDZjYzIzNDAwMTcxN2ExYzAiLCJ1c2VybmFtZSI6InN1cGVybWFuc0JvZHlnYXVyZHMiLCJpYXQiOjE2Mjk1NTQ3ODF9.TGH8VtdQ1VrdlW1HMjhKpBqJr2BL_y9oPkLrAitqP2o`
            },
            body: JSON.stringify(
                {
                    post: {
                        title: title,
                        description: description,
                        price: price,
                        ... location && {location: location},
                        ... willDeliver && {willDeliver: willDeliver}
                    }
                }
            )
            });
            
            const obj = await response.json();
            const post = obj.data.post;
            setuserPosts([post, ...userposts])
            setPostList([post, ...postList])
            setTitle('')
            setDescription('')
            setPrice('')
            setLocation('')
            setWillDeliver('')
            }
            catch (error) {
            throw error;
            }

        }
        
        else{
            alert("please fill out forms")
        }
        // Check that the user entered stuff into the inputs
        // Validate data
        // Make a ajax request to the backend
        // Backend will return a response letting us know if the user was authenticated or not
        
       

        // setSubmitForm(true);
    };
    return (
    <section className="NewPost">
      {!userLoggedIn && <h1>NewPost</h1>}
      <form onSubmit={postHandler}>
        <div>
          <label>Title </label>
          <input type="text"
          placeholder="Title" 
          value = {title} 
          onChange={(e)=> setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description </label>
          <input type="text" 
          placeholder="Description" 
          value = {description} 
          onChange={(e)=> setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price </label>
          <input type="text" 
          placeholder="Price" 
          value = {price} 
          onChange={(e)=> setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Location </label>
          <input type="text"
          placeholder="Location (optional)" 
          value = {location} 
          onChange={(e)=> setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Will Deliver?</label>
          <input type="text"
          placeholder="Will Deliver? (optional)" 
          value = {willDeliver} 
          onChange={(e)=> setWillDeliver(e.target.value)}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </section>
  );

}

export default NewPost;
