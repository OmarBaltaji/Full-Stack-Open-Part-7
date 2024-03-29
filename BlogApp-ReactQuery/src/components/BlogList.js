import React from "react";
import { deleteBlog, getAll, update } from "../services/blogs";
import Blog from "./Blog";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNotify } from "../contexts/NotificationContext";
import { ListGroup } from "react-bootstrap";

const BlogList = () => {
  const notify = useNotify();

  const queryClient = useQueryClient();

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: (deleteBlogId) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.filter(blog => blog.id !== deleteBlogId));
    },
    onError: (error) => {
      notify({ message: error.response.data.error, className: "danger" });
    }
  });

  const onDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlogMutation.mutate(id);
    }
  };

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
    <ListGroup>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onDeleteBlog={onDeleteBlog}
        />
      ))}
    </ListGroup>
  )
}

export default BlogList;