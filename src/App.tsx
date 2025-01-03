import "./App.css";
import { DataGridComponent } from "./components/DataGrid.component";
import deviceData from "./data/device-data.json";

function App() {
  return (
    <>
      <h2>Datagrid</h2>
      <DataGridComponent deviceList={deviceData} />
    </>
  );
}

export default App;
