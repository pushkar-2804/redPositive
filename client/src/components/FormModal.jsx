import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Modal, TextField, Button, Box } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { inputFields, styles } from "../constants/index";
import fetchData from "../utils/fetchData";
import { setAllData } from "../store/slices/dataSlice";
import { useDispatch } from "react-redux";

const FormModal = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const initialFormData = {
    name: "",
    phone: "",
    email: "",
    hobbies: "",
  };
  const [formData, setFormData] = useState(initialFormData);

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
      await axios.post("http://localhost:5000/setdata", formData);
      const newData = await fetchData();
      dispatch(setAllData(newData));
      setFormData({
        name: "",
        phone: "",
        email: "",
        hobbies: "",
      });
      toast.success("Form submitted successfully");
      handleClose();
    } catch {
      toast.error("Error submitting form");
      handleClose();
    }
  };

  return (
    <div>
      <ToastContainer />
      <Button variant="contained" onClick={handleOpen}>
        Add New Data
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles}>
          {/* <div className="modal-container"> */}
          <form className="modal-form">
            {inputFields.map((field, index) => (
              <TextField
                key={index}
                label={field.name}
                name={field.value}
                value={formData[field.value]}
                onChange={handleChange}
              />
            ))}
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </form>
          {/* </div> */}
        </Box>
      </Modal>
    </div>
  );
};

export default FormModal;
