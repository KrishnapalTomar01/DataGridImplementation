import React, { useCallback } from "react";
import { DeviceType } from "./types";
import greenDotIconSrc from "../assets/green-circle.svg";
import "./DataGrid.component.css";

import { getUpperCaseFirstWord } from "../utils/getUpperCaseFirstWord";

interface Props {
  selectedDevices: DeviceType[];
  deviceList: DeviceType[];
  setSelectedDevices: React.Dispatch<React.SetStateAction<DeviceType[]>>;
}

export const DataGridTable = ({
  selectedDevices,
  deviceList,
  setSelectedDevices,
}: Props) => {
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
  );
};
