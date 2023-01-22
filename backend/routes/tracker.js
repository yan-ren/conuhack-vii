import express from "express";
// remember to add .js extension (it can be ignored in react but not in node)
import {
  getTracker
} from "../controllers/tracker.js";

const router = express.Router();

// localhost:3001/report
router.get("/", getTracker);

export default router;
