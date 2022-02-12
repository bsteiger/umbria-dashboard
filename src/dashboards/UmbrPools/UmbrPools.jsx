import {
  LineChart,
  Line,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
  Tooltip,
  XAxis,
} from "recharts";
import React, { useState, useEffect } from "react";
import { getUmbrPoolAprBreakdown } from "./umbrPoolLogic";

function UmbrPools() {
  const [umbrPoolData, setUmbrPoolData] = useState([]);

  useEffect(() => {
    async function getUmbrData() {
      const poolData = await getUmbrPoolAprBreakdown("ethereum", 7);
      return setUmbrPoolData(poolData);
    }
    getUmbrData();
  }, []);

  return (
    <div className="overview-page">
      <div className="container">
        <div className="row mt-2">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">UMBR Staking Rewards</h5>
                <p className="card-subtitle mb-2">
                  Estimated rewards for staking UMBR (broken down by asset)
                </p>
                <RechartChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UmbrPools;

/////////DEMO DATA AND CHART
const data = [
  {
    network: "Ethereum",
    ETH: 20.36,
    GHST: 0.003,
    UMBR: 0,
    USDT: 0.115,
    USDC: 0.67,
    MATIC: 0.9882503630437056,
    WBTC: 0.004291140417084454,
  },
  {
    network: "Polygon",
    ETH: 16.36,
    GHST: 0.003,
    UMBR: 0,
    USDT: 0.115,
    USDC: 0.67,
    MATIC: 0.9882503630437056,
    WBTC: 0.004291140417084454,
  },
];
function RechartChart() {
  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ETH" stackId="a" fill="#8884d8" />
        <Bar dataKey="USDC" stackId="a" fill="#82ca9d" />
        <Bar dataKey="MATIC" stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  );
}

// function ApexChartsChart() {
//   return {<ApexCharts ser/>};
// }
