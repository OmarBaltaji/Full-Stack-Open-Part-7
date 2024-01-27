import React, { useRef } from "react";
import LoginForm from "../components/LoginForm";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";
import BlogList from "../components/BlogList";
import { useUserValue } from "../contexts";
import { Container } from "react-bootstrap";

const Home = () => {
  const blogFormRef = useRef();
  const user = useUserValue();

  const postSubmission = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <Container>
      {!user && <LoginForm />}
      {user && (
        <>
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm postSubmission={postSubmission} />
          </Togglable>
          <br />
          <BlogList />
        </>
      )}
    </Container>
  )
}

export default Home;