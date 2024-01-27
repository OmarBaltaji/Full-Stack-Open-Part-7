import { useState } from "react";
import { useNotify } from "../contexts/NotificationContext";
import { useUserDispatch } from "../contexts";
import { Button, Container, Form } from "react-bootstrap";

const LoginForm = ({ postLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const notify = useNotify();
  const dispatchUser = useUserDispatch();

  const handleChange = (target, field) => {
    setCredentials((oldCredentials) => ({
      ...oldCredentials,
      [field]: target.value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatchUser({ type: "set",  credentials });
    } catch (error) {
      notify({ message: error.response.data.error, className: "danger" });
    }
  };

  return (
    <Container className="mt-5 w-50">
      <h2 className="mb-4">Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            id="username"
            name="username"
            value={credentials.username}
            onChange={({ target }) => handleChange(target, "username")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={({ target }) => handleChange(target, "password")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
