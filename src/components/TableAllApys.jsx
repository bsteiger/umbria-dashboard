import React, { useState, useEffect } from "react";
import { SortUpIcon, SortDownIcon } from "./icons";
/** Table component containing all APYs for all Networks */
function TableAllApys({ data }) {
  const headers = [
    { text: "Asset", styles: {} },
    { text: "Network", styles: {} },
    { text: "Bridge", styles: {} },
    { text: "APY", styles: { textAlign: "right" }, sortIconLocation: "left" },
  ];

  useEffect(() => {
    // Stuff to do when the component loads
  }, []);

  return (
    <table className="table table-sm">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.text} style={{ ...header.styles }} scope="col">
              {header.text}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => {
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
