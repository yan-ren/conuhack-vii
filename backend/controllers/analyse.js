import DataAnalyse from "../models/dataAnalyse.js";

export const getDataAnalyse = async (req, res) => {
    console.log("getDataAnalyse");
  try {
    const dataAnalyse = await DataAnalyse.find();
    res.status(200).json(dataAnalyse);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
