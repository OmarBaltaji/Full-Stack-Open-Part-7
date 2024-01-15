import React, { useEffect, useState } from "react";
import blogService, { deleteBlog, getAll, update } from "../services/blogs";
import Blog from "./Blog";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const onLikeClicked = async (blog) => {
    //
  };

  const onDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      //
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
        />
      ))}
    </ul>
  )
}

export default BlogList;