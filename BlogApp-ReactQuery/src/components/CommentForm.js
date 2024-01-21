import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addComment } from "../services/blogs";
import { useParams } from "react-router-dom";

const CommentForm = () => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params.id;

  const addCommentMutation = useMutation({
    mutationFn: () => addComment(id, comment),
    onSuccess: (updatedBlog) => {
      console.log(updatedBlog);
      queryClient.setQueryData(["blog"], updatedBlog);
      setComment("");
    }
  });

  const submitComment = (e) => {
    e.preventDefault();
    addCommentMutation.mutate(comment);
  }

  return (
    <form onSubmit={submitComment} className="mb-2">
      <input value={comment} onChange={({ target }) => setComment(target.value)} />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm;