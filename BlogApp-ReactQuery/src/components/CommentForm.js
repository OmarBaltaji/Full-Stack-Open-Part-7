import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addComment } from "../services/blogs";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const CommentForm = () => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params.id;

  const addCommentMutation = useMutation({
    mutationFn: () => addComment(id, comment),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blog"], updatedBlog);
      setComment("");
    }
  });

  const submitComment = (e) => {
    e.preventDefault();
    addCommentMutation.mutate(comment);
  }

  return (
    <Form onSubmit={submitComment} className="w-50">
      <Form.Control className="mb-3" value={comment} onChange={({ target }) => setComment(target.value)} />
      <Button variant="primary" type="submit">Comment</Button>
    </Form>
  )
}

export default CommentForm;