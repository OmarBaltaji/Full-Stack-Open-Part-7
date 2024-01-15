import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import "./index.css";
import Togglable from "./components/Togglable";
import Navbar from "./components/Navbar";
import BlogList from "./components/BlogList";

const App = () => {
  const blogFormRef = useRef();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
    }
  }, [user]);

  const postSubmission = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Notification />
      {!user && <LoginForm />}
      {user && (
        <>
          <Navbar />
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm postSubmission={postSubmission} />
          </Togglable>
          <br />
          <BlogList />
        </>
      )}
    </div>
  );
};

export default App;
