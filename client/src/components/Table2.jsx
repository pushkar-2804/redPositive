import React, { useState, useEffect } from "react";
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

const CustomTable = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/alldata");
    setData(response.data);
  };

  const handleRowSelect = (item) => {
    if (selectedRows.includes(item)) {
      setSelectedRows(selectedRows.filter((row) => row !== item));
    } else {
      setSelectedRows([...selectedRows, item]);
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
                onChange={() => {
                  if (selectedRows.length === data.length) {
                    setSelectedRows([]);
                  } else {
                    setSelectedRows(data.map((item) => item));
                  }
                }}
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
