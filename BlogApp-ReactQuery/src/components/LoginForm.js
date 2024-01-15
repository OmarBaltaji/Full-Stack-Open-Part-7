import { useState } from "react";
import { useNotify } from "../contexts/NotificationContext";
import { useUserDispatch } from "../contexts";

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
      notify({ message: error.response.data.error, className: "error" });
    }
  };

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input
            id="username"
            name="username"
            value={credentials.username}
            onChange={({ target }) => handleChange(target, "username")}
          />
        </div>
        <div>
          <label>password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={({ target }) => handleChange(target, "password")}
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
