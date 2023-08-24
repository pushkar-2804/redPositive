import React from "react";
import "./App.css";
import FormModal from "./components/FormModal";
import Table from "./components/Table";

function App() {
  return (
    <div className="App">
      <h1>CRUDS Application</h1>
      <FormModal />
      <Table />
    </div>
  );
}

export default App;
