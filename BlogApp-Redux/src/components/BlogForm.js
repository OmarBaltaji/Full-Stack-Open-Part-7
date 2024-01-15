import { useState } from "react";
import PropTypes from "prop-types";
import { notify } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ postSubmission }) => {
  const initialPropertiesValues = {
    title: "",
    author: "",
    url: "",
  };

  const dispatch = useDispatch();
  const [blog, setBlog] = useState(initialPropertiesValues);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(createBlog(blog));
      postSubmission();
      dispatch(notify({ message: "Blog created successfully", className: "success" }));
      setBlog(initialPropertiesValues);
    } catch (error) {
      postSubmission();
      dispatch(notify({ message: "Failed to create blog", className: "error" }));
    }
  }
  const handleChange = (target, field) => {
    setBlog((oldBlog) => ({ ...oldBlog, [field]: target.value }));
  };

  return (
    <>
      <h3>Create new blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title</label>
          <input
            id="blog-title"
            name="title"
            value={blog.title}
            onChange={({ target }) => handleChange(target, "title")}
          />
        </div>
        <div>
          <label>author</label>
          <input
            id="blog-author"
            name="author"
            value={blog.author}
            onChange={({ target }) => handleChange(target, "author")}
          />
        </div>
        <div>
          <label>url</label>
          <input
            id="blog-url"
            name="url"
            value={blog.url}
            onChange={({ target }) => handleChange(target, "url")}
          />
        </div>
        <button id="blog-submit-btn" type="submit">
          Create
        </button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  postSubmission: PropTypes.func.isRequired,
};

export default BlogForm;
