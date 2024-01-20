import { useEffect, useRef } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Navbar from "./components/Navbar";
import { useUserValue } from "./contexts";
import { Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import Home from "./components/Home";

import "./index.css";

const App = () => {
  const user = useUserValue();

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
    }
  }, [user]);

  return (
    <div>
      <Notification />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/users" element={<Users />} /> 
      </Routes>
    </div>
  );
};

export default App;
