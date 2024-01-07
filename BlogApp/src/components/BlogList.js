import React, { useEffect } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";

const BlogList = ({ blogs, setBlogs, user }) => {
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  const onLikeClicked = async (blog) => {
    const updatedBlog = await blogService.update(blog);
    setBlogs((oldBlogs) => {
      return oldBlogs.map((blog) => {
        if (blog.id === updatedBlog.id) {
          return updatedBlog;
        }
        return blog;
      });
    });
  };

  const onDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await blogService.deleteBlog(id);
      setBlogs((oldBlogs) => oldBlogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <ul>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onLikeClicked={onLikeClicked}
          onDeleteBlog={onDeleteBlog}
          user={user}
        />
      ))}
    </ul>
  )
}

export default BlogList;