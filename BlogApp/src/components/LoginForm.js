import { useState } from "react";
import loginService from "../services/login";
import PropTypes from "prop-types";
import blogService from "../services/blogs";
import { useNotify } from "../contexts/NotificationContext";

const LoginForm = ({ postLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const notify = useNotify();

  const handleChange = (target, field) => {
    setCredentials((oldCredentials) => ({
      ...oldCredentials,
      [field]: target.value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(credentials);
      postLogin(user);
      localStorage.setItem("loggedUserInfo", JSON.stringify(user));
      blogService.setToken(user.token);
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

LoginForm.propTypes = {
  postLogin: PropTypes.func.isRequired,
};

export default LoginForm;
