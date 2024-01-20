import React from "react";
import { useUserDispatch, useUserValue } from "../contexts";

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
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="container">
            <h2>blogs</h2>
            <p>
              <strong>Logged in as {user.name}</strong>
            </p>
          </div>
        </>
      }
    </>
  )
}

export default Navbar;