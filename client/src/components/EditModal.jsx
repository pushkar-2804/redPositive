import React, { useState } from "react";
import { Modal, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { inputFields, styles } from "../constants/index";
import fetchData from "../utils/fetchData";
import { setAllData } from "../store/slices/dataSlice";
import { useDispatch } from "react-redux";
import validateForm from "../utils/validate";

const EditModal = ({ open, onClose, detail }) => {
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      try {
        await axios.put("http://localhost:5000/updatedata", {
          ...formData,
          _id: detail._id,
        });
        const newData = await fetchData();
        dispatch(setAllData(newData));
        toast.success("Data updated successfully!");
        onClose();
      } catch (error) {
        toast.error("Something went wrong!");
        onClose();
      }
    } else {
      setFormErrors(errors);
    }
  };

  // Validation
  const initialFormErrors = {
    name: null,
    phone: null,
    email: null,
    hobbies: null,
  };
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const handleBlur = (e) => {
    const { name } = e.target;
    const errors = validateForm(formData);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errors[name] || null,
    }));
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

  const cancel = () => {
    setFormData(initialFormData);
    setFormErrors(initialFormErrors);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles}>
        <form className="modal-form">
          <h2 className="heading">Update Data</h2>
          {inputFields.map((field, index) => (
            <TextField
              key={index}
              label={field.name}
              name={field.value}
              value={formData[field.value]}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={formErrors[field.value] !== null}
              helperText={formErrors[field.value] || " "}
            />
          ))}
          <Button variant="contained" onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button variant="contained" color="secondary" onClick={cancel}>
            Cancel
          </Button>
        </form>
        <ToastContainer />
      </Box>
    </Modal>
  );
};

export default EditModal;
