import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { getBlog, update } from "../services/blogs";
import { useNotify } from "../contexts";
import CommentForm from "../components/CommentForm";

const BlogView = () => {
  const params = useParams();
  const notify = useNotify();
  const queryClient = useQueryClient();

  const updateBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blog"], updatedBlog)
    },
    onError: (error) => {
      notify({ message: error.response.data.error, className: "error" });
    }
  });

  const { isError, isLoading, error, data } = useQuery({
    queryKey: ["blog"],
    queryFn: () => getBlog(params.id),
    refetchOnWindowFocus: false,
  });

  const detailsStyle = {
    marginBottom: "7px",
  };

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    updateBlogMutation.mutate(updatedBlog);  
  };

  if (isLoading) {
    return <div className="container">Loading blog...</div>;    
  }

  if (isError) {
    return <div className="container">An error occurred {error.message}</div>;
  }

  const blog = data;

  return (
    <div className="container">
      <h2 className="mb-1">{blog.title}</h2>
      <div style={detailsStyle}>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div style={detailsStyle}>
        <span className="blog-likes">{blog.likes} Likes</span>{" "}
        <button onClick={handleLike}>like</button>
      </div>
      <div>Added by {blog?.user?.name}</div>
      <h3>comments</h3>
      <CommentForm />
      {(blog?.comments && blog?.comments.length > 0) && 
        <ul className="pl-40">
          {blog?.comments.map(comment =>
            <li key={`${blog.id}-${comment}`}>{comment}</li>
          )}
        </ul>
      }
    </div>
  )
}

export default BlogView;