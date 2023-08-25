import React from "react";
import "./App.css";
import FormModal from "./components/FormModal";
import Table from "./components/Table2";
import SendEmail from "./components/SendEmail";
import { useSelector } from "react-redux";

function App() {
  const selectedRows = useSelector(
    (state) => state.selectedRows.selectedRows
  ).length;
  console.log(selectedRows);
  return (
    <div className="App">
      <h1>CRUDS Application</h1>
      <FormModal />
      {selectedRows > 0 && <SendEmail />}
      <Table />
    </div>
  );
}

export default App;
