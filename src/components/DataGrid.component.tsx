import { useCallback, useMemo, useState } from "react";
import "./DataGrid.component.css";
import { Checkbox } from "./Checkbox/CheckBox.component";
import greenDotIconSrc from "../assets/green-circle.svg";
import downloadIconSrc from "../assets/download.svg";
import downloadDisabledIconSrc from "../assets/download-disabled.svg";
import { getUpperCaseFirstWord } from "../utils/getUpperCaseFirstWord";

type DeviceType = {
  name: string;
  device: string;
  path: string;
  status: string;
};

interface Props {
  deviceList: DeviceType[];
}
export const DataGridComponent = ({ deviceList }: Props) => {
  const [selectedDevices, setSelectedDevices] = useState<DeviceType[]>([]);
  const deviceDownloadDisabled = useMemo(
    () =>
      !selectedDevices.length ||
      selectedDevices.some((device) => device.status !== "available"),
    [selectedDevices]
  );

  const onClickDownload = useCallback(() => {
    alert(
      `Selected Devices: \n ${selectedDevices.map(
        (deviceData) =>
          `Name: ${deviceData.name} Device: ${deviceData.device} Path: ${deviceData.path} \n`
      )}`
    );
  }, [selectedDevices]);

  const onSelectAllCheckBoxClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelectedDevices(deviceList);
      } else {
        setSelectedDevices([]);
      }
    },
    []
  );

  const onDeviceCheckboxClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, device: DeviceType) => {
      if (event.target.checked) {
        setSelectedDevices((devices) =>
          devices.length ? [...devices, device] : [device]
        );
      } else {
        setSelectedDevices((devices) => {
          const deviceIndex = devices.findIndex(
            (currentDevice) => currentDevice === device
          );
          if (typeof deviceIndex === "number") {
            const cloneArray = devices.slice();
            cloneArray.splice(deviceIndex, 1);
            return cloneArray;
          }
          return devices;
        });
      }
    },
    [setSelectedDevices]
  );
  return (
    <div>
      {/* top section */}
      <div className="flex">
        <Checkbox
          checked={selectedDevices.length === deviceList.length}
          indeterminate={
            selectedDevices.length > 0 &&
            selectedDevices.length < deviceList.length
          }
          onChange={(event) => onSelectAllCheckBoxClick(event)}
        />

        <div>
          {selectedDevices.length > 0 ? selectedDevices.length : "None"}{" "}
          selected
        </div>

        <button
          disabled={deviceDownloadDisabled}
          className="downloadButton"
          onClick={onClickDownload}
        >
          <div className="flex">
            <img
              src={
                deviceDownloadDisabled
                  ? downloadDisabledIconSrc
                  : downloadIconSrc
              }
              alt="download-icon"
              title="download"
            />
            <span>Download Selected</span>
          </div>
        </button>
      </div>

      {/* Device table */}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deviceList.map((deviceData) => (
            <tr key={deviceData.name}>
              <th>
                <input
                  type="checkbox"
                  checked={selectedDevices?.includes(deviceData)}
                  onChange={(event) => onDeviceCheckboxClick(event, deviceData)}
                />
              </th>
              <td>{deviceData.name}</td>
              <td>{deviceData.device}</td>
              <td>{deviceData.path}</td>
              <td>
                {deviceData.status === "available" && (
                  <img src={greenDotIconSrc} width="10" height="10" />
                )}{" "}
                {getUpperCaseFirstWord(deviceData.status)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
