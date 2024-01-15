import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(_, action) {
      return action.payload;
    }
  }
});

export const { appendBlog, setBlogs } = blogSlice.actions;

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const savedBlog = await blogService.create(newBlog);
    dispatch(appendBlog(savedBlog));
  }
}

export default blogSlice.reducer;