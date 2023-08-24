import React, { useState, useEffect } from "react";
import axios from "axios";
import MoreModal from "./MoreModal";

const Table = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const testData = [
    {
      _id: "1",
      name: "John",
      phoneNumber: "1234567890",
      email: "johnTheDon@gmail.com",
      hobbies: "Coding",
    },
  ];

  // const fetchData = async () => {
  //   const response = await axios.get("/api/data");
  //   setData(response.data);
  // };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Hobbies</th>
          <th>More</th>
        </tr>
      </thead>
      <tbody>
        {/* {data.map((item) => ( */}
        {testData.map((item) => (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.email}</td>
            <td>{item.hobbies}</td>
            <td>
              <MoreModal />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
