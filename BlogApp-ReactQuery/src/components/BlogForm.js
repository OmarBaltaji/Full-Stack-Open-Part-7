import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import { create } from "../services/blogs";
import { useNotify } from "../contexts/NotificationContext";
import { Button, Form } from "react-bootstrap";

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
      notify({ message: error.response.data.error, className: "danger" })
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
    <div className="mt-3 w-50">
      <h3>Create new blog</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="blog-title"
            name="title"
            value={blog.title}
            onChange={({ target }) => handleChange(target, "title")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            id="blog-author"
            name="author"
            value={blog.author}
            onChange={({ target }) => handleChange(target, "author")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Url</Form.Label>
          <Form.Control
            id="blog-url"
            name="url"
            value={blog.url}
            onChange={({ target }) => handleChange(target, "url")}
          />
        </Form.Group>
        <Button variant="primary" className="mb-3" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

BlogForm.propTypes = {
  postSubmission: PropTypes.func.isRequired,
};

export default BlogForm;
