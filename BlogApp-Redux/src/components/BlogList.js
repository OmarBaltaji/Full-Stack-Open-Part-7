import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { initialBlogs } from "../reducers/blogReducer";

const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(initialBlogs());
  }, []);

  const onLikeClicked = async (blog) => {
    const updatedBlog = await blogService.update(blog);
    // setBlogs((oldBlogs) => {
    //   return oldBlogs.map(blog => {
    //     if (blog.id === updatedBlog.id) {
    //       return updatedBlog;
    //     }
    //     return blog;
    //   });
    // });
  };

  const onDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await blogService.deleteBlog(id);
      // setBlogs((oldBlogs) => oldBlogs.filter(blog => blog.id !== id));
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