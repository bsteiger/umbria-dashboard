import React, { Component } from "react";
import Chart from "react-apexcharts";

const props = {
  options: {
    chart: {
      toolbar: { tools: { download: false } },
      id: "basic-bar",

      dropShadow: {
        enabled: true,
        opacity: 0.25,
      },
    },

    xaxis: {
      categories: ["ETH", "UMBR", "MATIC", "USDC"],
    },
    yaxis: {
      labels: {
        formatter: (s) => {
          return `${s.toFixed(1)}%`;
        },
      },
    },
  },

  series: [
    {
      name: "Ethereum Network (Eth-Matic Bridge)",
      data: [29.01, 15.6, 2.9, 12.6],
    },

    {
      name: "Poygon Network (Eth-Matic Bridge)",
      data: [28, 19.9, 10.2, 12.2],
    },
  ],
};

class BarChart extends Component {
  render() {
    return (
      <div className="container">
        <Chart
          options={props.options}
          series={props.series}
          type="bar"
          width="500"
        />
      </div>
    );
  }
}

export default BarChart;
