import React from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { useLocation } from "react-router";

const User = () => {
  const { state: user } = useLocation();

  if (!user) {
    return null;
  }
  
  return (
    <Container>
      <h2 className="mb-4">{user.name}</h2>
      <h3 className="text-decoration-underline mb-3">Added blogs</h3>
      <ListGroup className="w-75">
        {user.blogs.map(blog => 
          <ListGroupItem key={blog.id} className="p-3">
            {blog.title}
          </ListGroupItem>
        )}
      </ListGroup>
    </Container>
  )
}

export default User;