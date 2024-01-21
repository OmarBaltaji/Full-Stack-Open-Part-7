import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { getBlog, update } from "../services/blogs";
import { useNotify } from "../contexts";

const BlogView = () => {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const notify = useNotify();

  const updateBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedBlog) => {
      setBlog(updatedBlog);
    },
    onError: (error) => {
      notify({ message: error.response.data.error, className: "error" });
    }
  });

  useEffect(() => {
    getBlog(params.id).then(data => {
      setBlog(data);
    });
  }, []);

  const detailsStyle = {
    marginBottom: "7px",
  };

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    updateBlogMutation.mutate(updatedBlog);  
  };

  if (!blog) {
    return null;
  }

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
      {(blog?.comments && blog?.comments.length > 0) && 
        <>
          <h3>comments</h3>
          <ul className="pl-40">
            {blog?.comments.map(comment =>
              <li key={`${blog.id}-${comment}`}>{comment}</li>
            )}
          </ul>
        </>
      }
    </div>
  )
}

export default BlogView;