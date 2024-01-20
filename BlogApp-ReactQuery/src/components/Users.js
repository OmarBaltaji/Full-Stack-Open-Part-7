import React from "react";
import { useQuery } from "react-query";
import { getAll } from "../services/users";

const Users = () => {
  const { isError, isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: getAll,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (isError) {
    return <div>An error has occurred: {error.message}</div>
  }

  return (
    <div className="container">
      <div className="users-header">
        <h1 className="mb-2">Users</h1>
        <h4>blogs created</h4>
      </div>
      {data.map(user =>
        <div key={user.id} className="user">
          <span className="mr-6">{user.name}</span>
          <span>{user.blogs.length}</span>
        </div>
      )}
    </div>
  )
}

export default Users;