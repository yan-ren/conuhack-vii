import axios from "axios";

// local server/backend endpoint
const API = axios.create({ baseURL: "http://localhost:3001" });

export const fetchPosts = () => API.get("/posts");
export const fetchPostsBySearch = (searchQuery) =>
  API.get(`/posts/search?searchQuery=${searchQuery.search}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const trackerPython = () => API.get("/getTracker");
