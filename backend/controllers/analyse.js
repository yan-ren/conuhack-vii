import DataAnalyse from "../models/dataAnalyse.js";

export const getDataAnalyse = async (req, res) => {
  try {
    const dataAnalyse = await DataAnalyse.find()
      .sort({ timeStamp: -1 })
      .limit(1); // latest doc
    res.status(200).json(dataAnalyse);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
