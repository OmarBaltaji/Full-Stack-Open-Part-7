import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { getBlog, update } from "../services/blogs";
import { useNotify } from "../contexts";
import CommentForm from "../components/CommentForm";
import { Button, Container, ListGroup, ListGroupItem } from "react-bootstrap";

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
      notify({ message: error.response.data.error, className: "danger" });
    }
  });

  const { isError, isLoading, error, data } = useQuery({
    queryKey: ["blog"],
    queryFn: () => getBlog(params.id),
    refetchOnWindowFocus: false,
  });

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    updateBlogMutation.mutate(updatedBlog);  
  };

  if (isLoading) {
    return <Container className="container">Loading blog...</Container>;    
  }

  if (isError) {
    return <Container className="container">An error occurred {error.message}</Container>;
  }

  const blog = data;

  return (
    <Container>
      <div className="mb-5">
        <h2 className="mb-3">{blog.title}</h2>
        <div className="mb-3">
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div className="mb-3">
          <span className="blog-likes me-3">{blog.likes} Likes</span>{" "}
          <Button variant="secondary" onClick={handleLike}>Like</Button>
        </div>
        <div>Added by {blog?.user?.name}</div>
      </div>
      <h3 className="mb-3">Comments</h3>
      <CommentForm />
      {(blog?.comments && blog?.comments.length > 0) && 
        <ListGroup className="mt-4">
          {blog?.comments.map(comment =>
            <ListGroupItem className="p-3" key={`${blog.id}-${comment}`}>{comment}</ListGroupItem>
          )}
        </ListGroup>
      }
    </Container>
  )
}

export default BlogView;