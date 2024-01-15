import React, { useState } from "react";

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedUserInfo");
  }

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