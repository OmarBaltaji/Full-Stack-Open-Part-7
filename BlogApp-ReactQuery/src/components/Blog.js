import { useState } from "react";
import PropTypes from "prop-types";
import { useUserValue } from "../contexts";
import { Link } from "react-router-dom";

const Blog = ({ blog, onLikeClicked, onDeleteBlog }) => {
  const user = useUserValue();

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <Link to={`/blogs/${blog.id}`} > 
        <b style={{ marginRight: "10px" }}>
          {blog.title} {blog.author}
        </b>
      </Link>
      {blog?.user?.username === user?.username && (
        <button onClick={() => onDeleteBlog(blog.id)}>Delete</button>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLikeClicked: PropTypes.func,
  onDeleteBlog: PropTypes.func,
};

export default Blog;
