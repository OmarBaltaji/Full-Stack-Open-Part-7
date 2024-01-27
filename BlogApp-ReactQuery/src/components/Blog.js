import { useState } from "react";
import PropTypes from "prop-types";
import { useUserValue } from "../contexts";
import { Link } from "react-router-dom";
import { Button, ListGroupItem } from "react-bootstrap";

const Blog = ({ blog, onLikeClicked, onDeleteBlog }) => {
  const user = useUserValue();

  return (
    <ListGroupItem className="p-3">
      <Link to={`/blogs/${blog.id}`} > 
        <b style={{ marginRight: "10px" }}>
          {blog.title} {blog.author}
        </b>
      </Link>
      {blog?.user?.username === user?.username && (
        <Button variant="danger" onClick={() => onDeleteBlog(blog.id)}>Delete</Button>
      )}
    </ListGroupItem>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLikeClicked: PropTypes.func,
  onDeleteBlog: PropTypes.func,
};

export default Blog;
