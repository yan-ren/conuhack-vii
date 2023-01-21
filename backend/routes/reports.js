import express from "express";
// remember to add .js extension (it can be ignored in react but not in node)
import {
  getDataAnalyse
} from "../controllers/analyse.js";

const router = express.Router();

// localhost:3001/report
router.get("/", getDataAnalyse);

export default router;
