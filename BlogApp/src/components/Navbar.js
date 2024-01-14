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
      <button onClick={handleLogout}>Logout</button>
      <h2>blogs</h2>
      <p>
        <strong>Logged in as {user.name}</strong>
      </p>
    </>
  )
}

export default Navbar;