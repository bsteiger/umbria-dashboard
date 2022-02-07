import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";

export default function lineChart({ data, title }) {
  const defaultOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: title,
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [],
    },
  };

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(defaultOptions);

  useEffect(() => {
    setSeries(data ? data : []);
  }, []);

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      // width={500}
      height={"320"}
    />
  );
}
