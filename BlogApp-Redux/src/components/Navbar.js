import React, { useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    //
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