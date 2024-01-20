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
        <div className="navbar">
          <button onClick={handleLogout}>Logout</button>
        </div>
      }
    </>
  )
}

export default Navbar;