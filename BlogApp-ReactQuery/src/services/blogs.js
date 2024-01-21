import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

export const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

export const update = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data;
};

export const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
  return id;
};

export const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config);
  return response.data;
}

const blogService = { getAll, create, setToken, update, deleteBlog };

export default blogService;
