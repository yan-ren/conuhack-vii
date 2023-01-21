import mongoose from "mongoose";

const analyseSchema = mongoose.Schema(
  {
    mean: Number,
    mode: Number,
    media: Number,
    counter: Object
  },
  { timestamps: true }
);

const DataAnalyse = mongoose.model("DataAnalyse", analyseSchema);

export default DataAnalyse;
