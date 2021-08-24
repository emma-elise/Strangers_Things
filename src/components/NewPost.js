import React, { useState } from "react";

// const NewPost = (props)=>{
//     const [title, setTitle] =useState('')
//     const [description, setDescription] = useState('')
//     const [price, setPrice] = useState('')
//     const [location, setLocation] = useState('')
//     const [willDeliver, setWillDeliver] = useState('')
//     function validateForm() {
//         return title.length && description.length && price.length >0;
//     }
//     function authenticate(event){
//         event.preventDefault()
//     }
//     return <section>
//         <Form onSubmit={authenticate}>
//          <Form.Group size="large" controlId="title">
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             autoFocus
//             type="text"
//             value={title}
//             onChange={(event) => setTitle(event.target.value)}
//           />
//         </Form.Group>
//         <Form.Group size="large" controlId="description">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             autoFocus
//             type="text"
//             value={description}
//             onChange={(event) => setDescription(event.target.value)}
//           />
//         </Form.Group>
//         <Form.Group size="large" controlId="price">
//           <Form.Label>Price</Form.Label>
//           <Form.Control
//             autoFocus
//             type="text"
//             value={price}
//             onChange={(event) => setPrice(event.target.value)}
//           />
//         </Form.Group>
//         <Form.Group size="large" controlId="location">
//           <Form.Label>Location</Form.Label>
//           <Form.Control
//             autoFocus
//             type="text"
//             value={location}
//             onChange={(event) => setLocation(event.target.value)}
//           />
//         </Form.Group>
//         <Form.Group size="large" controlId="willDeliver">
//           <Form.Label>Will Deliver?</Form.Label>
//           <Form.Control
//             autoFocus
//             type="text"
//             value={willDeliver}
//             onChange={(event) => setWillDeliver(event.target.value)}
//           />
//         </Form.Group>
//             <Button block size="large" type="submit" disabled={!validateForm()}>
//             Create Post
//             </Button>
//         </Form>
//     </section>
// }

// export default NewPost;
