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
import ButtonGroup from "../../components/ButtonGroup";
import { formatPercent } from "../../logic/utils";
import _ from "lodash";

//Data Structure example for umbrPoolData
const initialUmbrPoolData = {
  ethereum: { 1: null, 7: null, 14: null, 30: null },
  polygon: { 1: null, 7: null, 14: null, 30: null },
};

function UmbrPools() {
  const [umbrPoolData, setUmbrPoolData] = useState(initialUmbrPoolData);
  const [selectedAvg, setSelectedAvg] = useState(7);
  const headers = [
    { text: "Asset", styles: {} },
    { text: "Network", styles: {} },
    { text: "Bridge", styles: {} },
    { text: "APY", styles: { textAlign: "right" }, sortIconLocation: "left" },
  ];

  function umbrPoolAprFromPoolData(network) {
    console.log(network, umbrPoolData);
    if (!Object.keys(umbrPoolData).length) return null;
    return Object.values(umbrPoolData).reduce((a, b) => a + b);
  }

  function handleAvgSelect(value) {
    console.log(`Setting for ${value}d average`);
    setSelectedAvg(value);
  }

  useEffect(() => {
    async function getUmbrData() {
      let ethereumPoolData = getUmbrPoolAprBreakdown("ethereum", selectedAvg);
      let polygonPoolData = getUmbrPoolAprBreakdown("matic", selectedAvg);
      [ethereumPoolData, polygonPoolData] = await Promise.all([
        ethereumPoolData,
        polygonPoolData,
      ]);

      let newData = { ...umbrPoolData };
      newData.ethereum[selectedAvg] = ethereumPoolData;
      newData.polygon[selectedAvg] = polygonPoolData;
      setUmbrPoolData(newData);
    }

    // check the umbrPoolData[selectedAvg]
    // If it's undefined, get the data
    // if it's already there, we good
    console.log("In useEffect for getting UMBR Pool Data");
    console.log(umbrPoolData);
    getUmbrData(selectedAvg);
  }, [selectedAvg]);

  const buttons = [
    { text: "30d", value: 30 },
    { text: "14d", value: 14 },
    { text: "7d", value: 7 },
    { text: "1d", value: 1 },
  ];

  /// ((((RENDER)))) ///
  return (
    <div className="overview-page">
      <div className="container">
        <ButtonGroup
          buttons={buttons}
          onClick={(val) => handleAvgSelect(val)}
          activeValue={selectedAvg}
        />
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
        <div className="row mt-2">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Staking Rewards for UMBR on Ethereum Network
                </h5>
                <p className="card-subtitle mb-2">
                  {`Estimated rewards for staking UMBR: ${
                    umbrPoolData.ethereum[selectedAvg]
                      ? formatPercent(
                          _.sum(_.values(umbrPoolData.ethereum[selectedAvg]))
                        )
                      : "--%"
                  }`}
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Staking Rewards for UMBR on Polygon Network
                </h5>
                <p className="card-subtitle mb-2">
                  {`Estimated rewards for staking UMBR: ${
                    umbrPoolData.polygon[selectedAvg]
                      ? formatPercent(
                          _.sum(_.values(umbrPoolData.polygon[selectedAvg]))
                        )
                      : "--%"
                  }`}
                </p>
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
const demoChartData = [
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
        data={demoChartData}
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
