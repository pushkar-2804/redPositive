import React, { useEffect, useState } from "react";
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
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAllData } from "../store/slices/dataSlice";
import { setSelectedRows } from "../store/slices/selectedSlice";

const CustomTable = () => {
  const rowsPerPageOptions = [5, 10, 20];
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alldata.alldata);
  const selectedRows = useSelector((state) => state.selectedRows.selectedRows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/alldata`
      );
      console.log(`${import.meta.env.VITE_APP_URL}/alldata`);
      dispatch(setAllData(response.data.reverse()));
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
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dataToShow = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
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
            {dataToShow.map((item, index) => (
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
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CustomTable;
