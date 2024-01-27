import { useEffect, useRef } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import AppNavbar from "./components/Navbar";
import { useUserValue } from "./contexts";
import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Home from "./pages/Home";
import User from "./pages/User";
import BlogView from "./pages/BlogView";

const App = () => {
  const user = useUserValue();

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
    }
  }, [user]);

  return (
    <div>
      <AppNavbar />
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/users" element={<Users />} /> 
        <Route path="/users/:id" element={<User />} /> 
        <Route path="/blogs/:id" element={<BlogView />} /> 
      </Routes>
    </div>
  );
};

export default App;
