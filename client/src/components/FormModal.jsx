import React, { useState } from "react";
import axios from "axios";
import { Modal, TextField, Button, Box } from "@mui/material";

const FormModal = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const initialFormData = {
    name: "",
    phoneNumber: "",
    email: "",
    hobbies: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const inputFields = [
    { name: "Name", value: "name" },
    { name: "Phone Number", value: "phoneNumber" },
    { name: "Email", value: "email" },
    { name: "Hobbies", value: "hobbies" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name:", name, "value:", value);
    setFormData({ ...formData, [name]: value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formData:", formData);
      await axios.post("/api/data", formData);
      setFormData({
        name: "",
        phoneNumber: "",
        email: "",
        hobbies: "",
      });
      handleClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error submitting form:", error);
      handleClose(); // Close the modal after submission
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add New Data
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="modal-container">
            <form className="modal-form" onSubmit={handleSubmit}>
              {inputFields.map((field) => (
                <TextField
                  label={field.name}
                  name={field.value}
                  value={formData[field.value]}
                  onChange={handleChange}
                />
              ))}
              <Button type="submit" variant="contained">
                Save
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FormModal;
