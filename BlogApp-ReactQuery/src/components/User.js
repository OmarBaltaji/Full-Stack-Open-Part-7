import React from "react";
import { useLocation } from "react-router";

const User = () => {
  const { state: user } = useLocation();

  if (!user) {
    return null;
  }
  
  return (
    <div className="container">
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul className="pl-40">
        {user.blogs.map(blog => 
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default User;