import React from "react";
import "./App.css";
import FormModal from "./components/FormModal";
import Table from "./components/Table2";
import SendEmail from "./components/SendEmail";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

function App() {
  const selectedRows = useSelector(
    (state) => state.selectedRows.selectedRows
  ).length;
  return (
    <div className="App">
      <h1>CRUDS Application</h1>
      <div className="displayButton">
        <FormModal />
        {selectedRows > 0 && <SendEmail />}
      </div>
      <Table />
      <ToastContainer />
    </div>
  );
}

export default App;
