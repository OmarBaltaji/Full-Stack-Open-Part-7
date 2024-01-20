import React, { useRef } from "react";
import LoginForm from "./LoginForm";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import BlogList from "./BlogList";
import { useUserValue } from "../contexts";

const Home = () => {
  const blogFormRef = useRef();
  const user = useUserValue();

  const postSubmission = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div className="container">
      {!user && <LoginForm />}
      {user && (
        <>
          <h2>blogs</h2>
          <p>
            <strong>Logged in as {user.name}</strong>
          </p>
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm postSubmission={postSubmission} />
          </Togglable>
          <br />
          <BlogList />
        </>
      )}
    </div>
  )
}

export default Home;