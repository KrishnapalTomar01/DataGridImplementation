import { useState } from "react";

import { DeviceType } from "./types";
import { DataGridHeader } from "./DataGridHeader.component";
import { DataGridTable } from "./DataGridTable.component";

interface Props {
  deviceList: DeviceType[];
}

export const DataGridComponent = ({ deviceList }: Props) => {
  const [selectedDevices, setSelectedDevices] = useState<DeviceType[]>([]);

  return (
    <div>
      {/* top section */}
      <DataGridHeader
        selectedDevices={selectedDevices}
        deviceList={deviceList}
        setSelectedDevices={setSelectedDevices}
      />

      {/* Device table */}
      <DataGridTable
        selectedDevices={selectedDevices}
        deviceList={deviceList}
        setSelectedDevices={setSelectedDevices}
      />
    </div>
  );
};
