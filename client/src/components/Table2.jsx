import React, { useEffect } from "react";
import axios from "axios";
import MoreModal from "./MoreModal";
import {
  Checkbox,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAllData } from "../store/slices/dataSlice";
import { setSelectedRows } from "../store/slices/selectedSlice";

const CustomTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alldata.alldata);
  const selectedRows = useSelector((state) => state.selectedRows.selectedRows);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/alldata");
      dispatch(setAllData(response.data));
    };
    fetchData();
  }, []);

  const handleRowSelect = (item) => {
    if (selectedRows.includes(item)) {
      dispatch(setSelectedRows(selectedRows.filter((row) => row !== item)));
    } else {
      dispatch(setSelectedRows([...selectedRows, item]));
    }
  };
  const handleCheckBox = () => {
    if (selectedRows.length === data.length) {
      dispatch(setSelectedRows([]));
    } else {
      dispatch(setSelectedRows(data.map((item) => item)));
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                color="primary"
                indeterminate={
                  selectedRows.length > 0 && selectedRows.length < data.length
                }
                checked={selectedRows.length === data.length}
                onChange={handleCheckBox}
              />
            </TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Hobbies</TableCell>
            <TableCell>More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index + 1}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(item)}
                  onChange={() => handleRowSelect(item)}
                />
              </TableCell>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.hobbies}</TableCell>
              <TableCell>
                <MoreModal detail={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
