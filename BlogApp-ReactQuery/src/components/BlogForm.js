import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import { create } from "../services/blogs";
import { useNotify } from "../contexts/NotificationContext";

const BlogForm = ({ postSubmission }) => {
  const initialPropertiesValues = {
    title: "",
    author: "",
    url: "",
  };

  const notify = useNotify();

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog))
      postSubmission();
      notify({ message: "Blog created successfully", className: "success" });
    },
    onError: (error) => {
      notify({ message: error.response.data.error, className: "error" })
    }
  });

  const [blog, setBlog] = useState(initialPropertiesValues);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      newBlogMutation.mutate(blog);
      setBlog(initialPropertiesValues);
    } catch (error) {
      postSubmission(null, "Failed to create blog", "error");
    }
  };

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
