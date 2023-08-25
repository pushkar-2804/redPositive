const Data = require("../models/Data.js");

const addData = async (req, res) => {
  try {
    const { name, phone, email, hobbies } = req.body;
    const data = new Data({ name, phone, email, hobbies });
    await data.save();
    res.json({ message: "Data added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const { _id, name, phone, email, hobbies } = req.body;
    await Data.findOneAndUpdate(
      { _id },
      { name, phone, hobbies, email },
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
    const { _id } = req.params;
    await Data.findOneAndDelete({ _id });
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateData, getAllData, deleteData, addData };
