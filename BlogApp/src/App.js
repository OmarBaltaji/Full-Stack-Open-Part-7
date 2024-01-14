import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import "./index.css";
import Togglable from "./components/Togglable";
import Navbar from "./components/Navbar";
import BlogList from "./components/BlogList";
import { useNotify } from "./contexts/NotificationContext";

const App = () => {
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserInfo = localStorage.getItem("loggedUserInfo");

    if (loggedUserInfo) {
      const userInfo = JSON.parse(loggedUserInfo);
      setUser(userInfo);
      blogService.setToken(userInfo.token);
    }
  }, []);

  const postLogin = (user) => {
    setUser(user);
  };

  const postSubmission = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Notification />
      {!user && <LoginForm postLogin={postLogin} />}
      {user && (
        <>
          <Navbar user={user} setUser={setUser} />
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm postSubmission={postSubmission} />
          </Togglable>
          <br />
          <BlogList user={user} />
        </>
      )}
    </div>
  );
};

export default App;
