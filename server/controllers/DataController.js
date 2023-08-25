const Data = require("../models/Data.js");
// const { v4: uuidv4 } = require("uuid");

const addOrUpdateData = async (req, res) => {
  try {
    const { name, phone, email, hobbies } = req.body;
    await Data.findOneAndUpdate(
      { email },
      { name, phone, hobbies },
      { upsert: true, new: true }
    );

    res.json({ message: "Data added/updated successfully" });
  } catch (error) {
    // errorHandler(res, error);
    console.log(error);
  }
};

const getAllData = async (req, res) => {
  try {
    const allData = await Data.find();
    res.status(200).json(allData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteData = async (req, res) => {
  try {
    const { email, name, phone } = req.body;
    await Data.findOneAndDelete({ email }, { phone, name });
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addOrUpdateData, getAllData, deleteData };
