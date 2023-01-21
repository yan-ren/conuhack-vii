import express from "express";
// remember to add .js extension (it can be ignored in react but not in node)
import {
  getPosts,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

const router = express.Router();

// localhost:3001/posts
router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);

export default router;
