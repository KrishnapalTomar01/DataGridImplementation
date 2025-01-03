import React, { useCallback, useMemo } from "react";
import { DeviceType } from "./types";
import { Checkbox } from "./Checkbox/CheckBox.component";
import downloadIconSrc from "../assets/download.svg";
import downloadDisabledIconSrc from "../assets/download-disabled.svg";
import "./DataGrid.component.css";

interface Props {
  selectedDevices: DeviceType[];
  deviceList: DeviceType[];
  setSelectedDevices: React.Dispatch<React.SetStateAction<DeviceType[]>>;
}

export const DataGridHeader = ({
  selectedDevices,
  deviceList,
  setSelectedDevices,
}: Props) => {
  const deviceDownloadDisabled = useMemo(
    () =>
      !selectedDevices.length ||
      selectedDevices.some((device) => device.status !== "available"),
    [selectedDevices]
  );

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

  const onClickDownload = useCallback(() => {
    alert(
      `Selected Devices: \n ${selectedDevices.map(
        (deviceData) =>
          `Name: ${deviceData.name} Device: ${deviceData.device} Path: ${deviceData.path} \n`
      )}`
    );
  }, [selectedDevices]);

  return (
    <div className="tableHeader">
      <Checkbox
        checked={selectedDevices.length === deviceList.length}
        indeterminate={
          selectedDevices.length > 0 &&
          selectedDevices.length < deviceList.length
        }
        onChange={(event) => onSelectAllCheckBoxClick(event)}
      />

      <div className="selectedTextHeader">
        {selectedDevices.length > 0 ? selectedDevices.length : "None"} selected
      </div>

      <button
        disabled={deviceDownloadDisabled}
        className="downloadButton"
        onClick={onClickDownload}
      >
        <div className="flex">
          <img
            src={
              deviceDownloadDisabled ? downloadDisabledIconSrc : downloadIconSrc
            }
            alt="download-icon"
            title="download"
          />
          <span>Download Selected</span>
        </div>
      </button>
    </div>
  );
}
