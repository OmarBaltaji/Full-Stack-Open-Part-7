import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { notify } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (target, field) => {
    setCredentials((oldCredentials) => ({
      ...oldCredentials,
      [field]: target.value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(setUser(credentials));
    } catch (error) {
      dispatch(notify({ message: error.response.data.error, className: "error" }));
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
