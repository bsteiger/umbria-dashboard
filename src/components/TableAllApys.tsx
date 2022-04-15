import React, { useState, useEffect } from "react";
import { SortUpIcon, SortDownIcon } from "./icons";
import { Bridge } from "../constants/networks";
import _ from "lodash";

interface ApyData {
  apy: number;
  asset: string;
  bridge: Bridge;
  network: string;
}
type SortDirection = "asc" | "desc";
type Props = { data: any };

/** Table component containing all APYs for all Networks */
function TableAllApys({ data }: Props) {
  const [sortKey, setSortKey] = useState<string>("apy");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [sortedData, setSortedData] = useState<ApyData[]>(data);

  const headers: {
    text: string;
    key: string;
    sortIconLocation: "left" | "right";
    styles?: React.CSSProperties;
  }[] = [
    { text: "Asset", key: "asset", sortIconLocation: "right" },
    { text: "Network", key: "network", sortIconLocation: "right" },
    { text: "Bridge", key: "bridge", sortIconLocation: "right" },
    {
      text: "APY",
      key: "apy",
      styles: { textAlign: "right" },
      sortIconLocation: "left",
    },
  ];

  function handleSort(key: string) {
    if (key != sortKey) {
      setSortKey(key);
      setSortDirection("desc");
    } else {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    }
  }

  useEffect(() => {
    setSortedData(_.orderBy(data, sortKey, sortDirection));
  }, [data, sortKey, sortDirection]);

  return (
    <table className="table table-sm">
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              onClick={() => handleSort(header.key)}
              key={header.key}
              style={{ cursor: "pointer", ...header.styles }}
              scope="col"
            >
              {header.key === sortKey &&
                header.sortIconLocation === "left" &&
                sortDirection === "asc" && <SortUpIcon />}
              {header.key === sortKey &&
                header.sortIconLocation === "left" &&
                sortDirection === "desc" && <SortDownIcon />}
              {header.text}
              {header.key === sortKey &&
                header.sortIconLocation === "right" &&
                sortDirection === "asc" && <SortUpIcon />}
              {header.key === sortKey &&
                header.sortIconLocation === "right" &&
                sortDirection === "desc" && <SortDownIcon />}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((entry) => {
          return (
            <tr key={entry.asset + entry.network + entry.bridge}>
              <td>{entry.asset}</td>
              <td>{entry.network}</td>
              <td>{entry.bridge}</td>
              <td style={{ textAlign: "right" }}>{`${(100 * entry.apy).toFixed(
                2
              )}%`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableAllApys;
