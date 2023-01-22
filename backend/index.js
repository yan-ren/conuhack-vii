import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import reportRoutes from "./routes/reports.js";
import trackerPythonRoutes from "./routes/tracker.js";

const app = express();
dotenv.config();

// the extended: true precises that the req.body object will contain values of any type instead of just strings.
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// localhost:3001/posts
app.use("/posts", postRoutes);

app.use("/getTracker", trackerPythonRoutes);

app.use("/reports", reportRoutes);


const PORT = process.env.PORT || 3002;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));
