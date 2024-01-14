import React, { useEffect } from "react";
import blogService, { getAll } from "../services/blogs";
import Blog from "./Blog";
import { useQuery } from "react-query";

const BlogList = ({ user }) => {

  // const onLikeClicked = async (blog) => {
  //   const updatedBlog = await blogService.update(blog);
  //   setBlogs((oldBlogs) => {
  //     return oldBlogs.map((blog) => {
  //       if (blog.id === updatedBlog.id) {
  //         return updatedBlog;
  //       }
  //       return blog;
  //     });
  //   });
  // };

  // const onDeleteBlog = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this blog?")) {
  //     await blogService.deleteBlog(id);
  //     setBlogs((oldBlogs) => oldBlogs.filter((blog) => blog.id !== id));
  //   }
  // };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>An error has occurred {error.message}</div>
  }

  const blogs = data;

  return (
    <ul>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          // onLikeClicked={onLikeClicked}
          // onDeleteBlog={onDeleteBlog}
          user={user}
        />
      ))}
    </ul>
  )
}

export default BlogList;