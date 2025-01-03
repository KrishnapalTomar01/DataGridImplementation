import { useState } from "react";
import "./App.css";
import { DataGridComponent } from "./components/DataGrid.component";
import deviceData from "./data/device-data.json";

function App() {
  return (
    <>
      <h1>Datagrid</h1>
      <DataGridComponent deviceList={deviceData} />
    </>
  );
}

export default App;
