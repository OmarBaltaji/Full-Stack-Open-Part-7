import React from "react";

const Navbar = ({ setUser, user }) => {
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedUserInfo");
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