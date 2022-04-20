import React, { useState, useEffect } from "react";
import { SortUpIcon, SortDownIcon } from "./icons";
import { OverviewData } from "../constants/types";
import _ from "lodash";
import { BRIDGEDISPLAYNAMES } from "../constants/networks";

type SortDirection = "asc" | "desc";
type Props = { data: OverviewData[] | undefined };

/** Table component containing all APYs for all Networks */
function TableAllApys({ data }: Props) {
  const [sortKey, setSortKey] = useState<string>("apy");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [sortedData, setSortedData] = useState<OverviewData[] | undefined>(
    data
  );

  const headers: {
    text: string;
    key: string;
    sortIconLocation: "left" | "right";
    styles?: React.CSSProperties;
  }[] = [
    { text: "Asset", key: "asset", sortIconLocation: "right" },
    { text: "Network", key: "network.apiName", sortIconLocation: "right" },
    { text: "Bridge", key: "bridge", sortIconLocation: "right" },
    {
      text: "TVL",
      key: "tvlUsd",
      sortIconLocation: "left",
      styles: { textAlign: "right" },
    },
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
    console.log("Sorting...", { data, sortKey, sortDirection });
    setSortedData(_.orderBy(data, sortKey, sortDirection));
  }, [data, sortKey, sortDirection]);

  return (
    <div className="table-responsive">
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
          {sortedData &&
            sortedData.map((entry) => {
              return (
                <tr key={entry.asset + entry.network.apiName + entry.bridge}>
                  <td>{entry.asset}</td>
                  <td>{entry.network.displayName}</td>
                  <td>{BRIDGEDISPLAYNAMES[entry.bridge]}</td>
                  <td style={{ textAlign: "right" }}>
                    {entry.tvlUsd.toLocaleString("en-us", {
                      maximumFractionDigits: 0,
                      style: "currency",
                      currency: "usd",
                    })}
                  </td>
                  <td style={{ textAlign: "right" }}>{`${(
                    100 * entry.apy
                  ).toFixed(2)}%`}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default TableAllApys;
