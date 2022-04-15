import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { ApexOptions } from "apexcharts";
import { faTruckLoading } from "@fortawesome/free-solid-svg-icons";

interface LineChartProps {
  data: any;
  title: string;
}

export default function lineChart({ data, title }: LineChartProps) {
  const type = "line";
  const defaultOptions: ApexOptions = {
    noData: { text: "Loading..." },
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
    yaxis: {
      labels: {
        formatter: (value: number) => {
          return value ? "$" + value.toLocaleString("en-US") : "";
        },
      },
    },
  };

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState<ApexOptions>(defaultOptions);

  useEffect(() => {
    if (!data) return;
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
