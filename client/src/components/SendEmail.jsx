import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendSelectedDataByEmail } from "../store/slices/selectedSlice";
import MailIcon from "@mui/icons-material/Mail";
import { toast } from "react-toastify";

const SendEmail = () => {
  const dispatch = useDispatch();
  const selectedRows = useSelector((state) => state.selectedRows.selectedRows);

  const emailHandler = () => {
    toast.info("Sending Email...");
    const email = "info@redpositive.in";
    dispatch(sendSelectedDataByEmail({ selectedRows, email }));
  };
  return (
    <>
      <Button onClick={emailHandler} variant="contained" className="btnSend">
        <MailIcon /> Send Email
      </Button>
    </>
  );
};

export default SendEmail;
