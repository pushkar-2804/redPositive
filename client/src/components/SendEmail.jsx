import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendSelectedDataByEmail } from "../store/slices/selectedSlice";

const SendEmail = () => {
  const dispatch = useDispatch();
  const selectedRows = useSelector((state) => state.selectedRows.selectedRows);
  const emailHandler = () => {
    const email = "work.pushkarkhare@gmail.com";
    dispatch(sendSelectedDataByEmail({ selectedRows, email }));
  };
  return (
    <>
      <Button onClick={emailHandler}>Send Email</Button>
    </>
  );
};

export default SendEmail;
