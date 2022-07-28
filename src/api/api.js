import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });
const postUrl = "/posts";
const usersUrl = "/users";

export const fetchPosts = () => API.get(postUrl);
export const createPost = (newPost) => API.post(postUrl, newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`${postUrl}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${postUrl}/${id}`);
export const likePost = (id) => API.patch(`${postUrl}/${id}/likePost`);
export const signin = (formData) => API.post(`${usersUrl}/signin`, formData);
export const signup = (formData) => API.post(`${usersUrl}/signup`, formData);
