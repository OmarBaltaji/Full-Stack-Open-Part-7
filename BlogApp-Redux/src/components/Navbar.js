import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../reducers/userReducer";

const Navbar = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
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