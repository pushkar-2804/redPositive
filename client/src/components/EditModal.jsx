import React, { useState } from "react";
import { Modal, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { inputFields, styles } from "../constants/index";

const EditModal = ({ open, onClose, detail }) => {
  const handleSubmit = () => {
    axios
      .put("http://localhost:5000/updatedata", { ...formData, _id: detail._id })
      .then((res) => {
        console.log(res);
        toast.success("Data updated successfully!");
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
        onClose();
      });
  };

  const initialFormData = {
    name: detail.name,
    phone: detail.phone,
    email: detail.email,
    hobbies: detail.hobbies,
  };
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name:", name, "value:", value);
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles}>
        <form>
          {inputFields.map((field, index) => (
            <TextField
              key={index}
              label={field.name}
              name={field.value}
              value={formData[field.value]}
              onChange={handleChange}
            />
          ))}
          <Button variant="contained" onClick={handleSubmit}>
            Save Changes
          </Button>
        </form>
        <ToastContainer />
      </Box>
    </Modal>
  );
};

export default EditModal;
