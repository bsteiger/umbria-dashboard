import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";

const series = [
  {
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  },
];
const categories = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
];

export default function lineChart() {
  const [series, setSeries] = useState([
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ]);
  const [options, setOptions] = useState({
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
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  });

  useEffect(() => {
    // setSeries();
    // setOptions();
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
