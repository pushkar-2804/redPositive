import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import EditModal from "./EditModal";
import { setAllData } from "../store/slices/dataSlice";
import { useDispatch } from "react-redux";
import fetchData from "../utils/fetchData";

export default function MoreModal({ detail }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/deletedata/${detail._id}`);
      const newData = await fetchData();
      dispatch(setAllData(newData));
      toast.success("Data deleted successfully!");
      handleClose();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      handleClose();
    }
  };
  const handleEdit = () => {
    setEditModalOpen(true);
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        detail={detail}
      />
      <ToastContainer />
    </div>
  );
}
