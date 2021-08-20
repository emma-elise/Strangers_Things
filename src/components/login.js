import React, { useState } from "react";

// TODO: Work on Route path and endpoints

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validatateForm = () => email.length > 0 && password.length > 0;
  const handleSubmit = (event) => event.preventDefault();

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="large" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group size="large" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button block size="large" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
};
