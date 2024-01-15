import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { initialBlogs, likeBlog, deleteBlog } from "../reducers/blogReducer";

const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(initialBlogs());
  }, []);

  const onLikeClicked = async (blog) => {
    dispatch(likeBlog(blog));
  };

  const onDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
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