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
    },
    updateBlog(state, action) {
      return state.map(blog => {
        if (blog.id === action.payload.id) {
          return action.payload;
        }
        return blog;
      })
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload);
    }
  }
});

export const { appendBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions;

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

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog);
    dispatch(updateBlog(updatedBlog));
  }
}

export const deleteBlog = (blogId) => {
  return async dispatch => {
    await blogService.deleteBlog(blogId);
    dispatch(removeBlog(blogId));
  }
}

export default blogSlice.reducer;