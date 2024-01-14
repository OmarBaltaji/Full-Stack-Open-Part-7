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

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [feedbackClass, setFeedbackClass] = useState(null);
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

  const postSubmission = (newBlog, message, className) => {
    if (newBlog) {
      newBlog = { ...newBlog, user };
      setBlogs((oldBlogs) => [...oldBlogs, newBlog]);
    }
    blogFormRef.current.toggleVisibility();
    setFeedbackMessage(message);
    setFeedbackClass(className);
    setTimeout(() => {
      setFeedbackMessage(null);
      setFeedbackClass(null);
    }, 5000);
  };

  return (
    <div>
      {!user && <LoginForm postLogin={postLogin} />}
      {user && (
        <>
          <Navbar user={user} setUser={setUser} />
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm postSubmission={postSubmission} />
          </Togglable>
          <br />
          <BlogList blogs={blogs} setBlogs={setBlogs} user={user} />
        </>
      )}
    </div>
  );
};

export default App;
