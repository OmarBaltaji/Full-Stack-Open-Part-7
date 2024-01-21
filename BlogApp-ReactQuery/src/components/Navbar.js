import React from "react";
import { useUserDispatch, useUserValue } from "../contexts";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useUserValue();
  const dispatchUser = useUserDispatch();

  const handleLogout = () => {
    dispatchUser({ type: "remove" });
  };

  return (
    <>
      {user && 
        <>
          <div className="navbar">
            <div>
              <Link to='/' className="mr-1">Blogs</Link>
              <Link to='/users'>Users</Link>
            </div>
            <div>
              <strong className="mr-1">Logged in as {user.name}</strong>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <div className="container">
            <h2>blog app</h2>
          </div>
        </>
      }
    </>
  )
}

export default Navbar;