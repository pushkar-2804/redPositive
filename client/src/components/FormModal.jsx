import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Modal, TextField, Button, Box } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { inputFields, styles } from "../constants/index";
import fetchData from "../utils/fetchData";
import { setAllData } from "../store/slices/dataSlice";
import { useDispatch } from "react-redux";
import validateForm from "../utils/validate";

const FormModal = () => {
  const [open, setOpen] = useState(false);
  const initialFormErrors = {
    name: null,
    phone: null,
    email: null,
    hobbies: null,
  };
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const dispatch = useDispatch();
  const initialFormData = {
    name: "",
    phone: "",
    email: "",
    hobbies: "",
  };

  // Validation
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const errors = validateForm(formData);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errors[name] || null,
    }));
  };

  // Modal functions
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setFormErrors(initialFormErrors);
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      try {
        console.log("in");
        await axios.post("http://localhost:5000/setdata", formData);
        const newData = await fetchData();
        dispatch(setAllData(newData));
        toast.success("Data submitted successfully");
      } catch (error) {
        toast.error("Something went wrong!");
      }
      setFormData(initialFormData);
      handleClose();
    } else {
      setFormErrors(errors);
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
          <div className="modal-container">
            <form className="modal-form">
              <h2 className="heading">Add new Data</h2>
              {inputFields.map((field, index) => (
                <TextField
                  key={index}
                  label={field.name}
                  type={field.type}
                  name={field.value}
                  value={formData[field.value]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={formErrors[field.value] !== null}
                  helperText={formErrors[field.value] || " "}
                />
              ))}
              <Button type="submit" variant="contained" onClick={handleSubmit}>
                Save
              </Button>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                Cancel
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FormModal;
