import React, { useState } from "react";


const NewMessage = (props)=>{
    const {author_id, userId, post_id} = props
    const [message, setMessage] = useState('')
    const token = localStorage.getItem("token")
    const validationHandler = () => {
    if (message.length > 0) {
      return true;
    }
    return false;
    };
    const MessageHandler = async (event) => {
    event.preventDefault();
    if(author_id ===userId){
        alert('This is your Post!')
    }
    else if (validationHandler()) {
      try {
        const response = await fetch(
          `https://strangers-things.herokuapp.com/api/2105-VPI-RM-WEB-PT/posts/${post_id}/messages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              message: {
               content: message
              },
            }),
          }
        );

        const obj = await response.json();
        console.log(obj)
        setMessage("");
      } catch (error) {
        throw error;
      }
    } else {
      alert("Please Type Message");
    }
    // Check that the user entered stuff into the inputs
    // Validate data
    // Make a ajax request to the backend
    // Backend will return a response letting us know if the user was authenticated or not

    // setSubmitForm(true);
  };
    return (
        <section className="NewMessage">
        <form onSubmit={MessageHandler}>
            <div>
            <label>Message: </label>
            <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) =>setMessage(e.target.value)}
            />
            <button type="submit">Message</button>
            </div>
            
        </form>
        </section>
    );

}

export default NewMessage;