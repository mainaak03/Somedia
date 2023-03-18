import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const postRouter=express.Router();

// HOME PAGE
postRouter.get("/", verifyToken, getFeedPosts);
postRouter.get("/:userId", verifyToken, getUserPosts);

// UPDATES
postRouter.patch("/:id/like", verifyToken, likePost);

export default postRouter;