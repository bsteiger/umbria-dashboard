import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import _ from "lodash";

export default function lineChart({ data, title }) {
  const type = "line";
  const defaultOptions = {
    chart: {
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 3,
    },
    stroke: {
      curve: "smooth",
      width: 3,
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
      categories: ["30d", "14d", "7d", "1d"],
    },
  };

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(defaultOptions);

  useEffect(() => {
    if (!data) return;
    console.log(data);
    setSeries(data ? data : []);
  }, []);

  return (
    <Chart
      options={options}
      series={series}
      type={type}
      // width={500}
      height={"320"}
    />
  );
}
