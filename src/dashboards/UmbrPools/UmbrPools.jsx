import {
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
import {
  getUmbrPoolAprBreakdown,
  formatAprDataForRechart,
} from "./umbrPoolLogic";
import { COLORS } from "../../constants/networks";
import ButtonGroup from "../../components/ButtonGroup";
import { formatPercent } from "../../logic/utils";
import _ from "lodash";

//Data Structure example for umbrPoolData
const initialUmbrPoolData = {
  ethereum: { 1: null, 7: null, 14: null, 30: null },
  polygon: { 1: null, 7: null, 14: null, 30: null },
};

function UmbrPools() {
  const mobileWidth = 1000;
  const [umbrPoolData, setUmbrPoolData] = useState(initialUmbrPoolData);
  const [selectedAvg, setSelectedAvg] = useState(7);
  const [isMobile, setIsMobile] = useState(window.innerWidth < mobileWidth);

  const handleResize = () => {
    if (window.innerWidth < mobileWidth) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    document.title = `UMBR Dash | UMBR Pool APR Breakdown`;
  }, []);

  function handleAvgSelect(value) {
    console.log(`Setting for ${value}d average`);
    setSelectedAvg(value);
  }

  useEffect(() => {
    async function getUmbrData(key) {
      let ethereumPoolData = getUmbrPoolAprBreakdown("ethereum", key);
      let polygonPoolData = getUmbrPoolAprBreakdown("matic", key);
      [ethereumPoolData, polygonPoolData] = await Promise.all([
        ethereumPoolData,
        polygonPoolData,
      ]);

      let newData = { ...umbrPoolData };

      newData.ethereum[key] = ethereumPoolData;
      newData.polygon[key] = polygonPoolData;
      setUmbrPoolData(newData);
    }
    for (let key of _.keys(initialUmbrPoolData.ethereum)) {
      getUmbrData(key);
    }
  }, [umbrPoolData]);

  const buttons = [
    { text: "30d", value: 30 },
    { text: "14d", value: 14 },
    { text: "7d", value: 7 },
    { text: "1d", value: 1 },
  ];

  /// ((((RENDER)))) ///
  return (
    <div className="umbrpool-page">
      <div className="container mt-2">
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
                <RechartChart
                  isMobile={isMobile}
                  data={formatAprDataForRechart(umbrPoolData, selectedAvg)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-lg-2 mt-2">
          <div className="col">
            <div className="card mb-2">
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
            <div className="card mb-2">
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

function RechartChart({ data, isMobile }) {
  return (
    <ResponsiveContainer width="100%" aspect={isMobile ? 1.5 : 3}>
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
        <XAxis dataKey="network" />
        {data && (
          <YAxis
            label={{
              value: "APR",

              angle: -90,
              position: "insideLeft",
              fill: "#666666",
            }}
            tickFormatter={(tick) => formatPercent(tick, 0)}
          />
        )}
        {/* <YAxis tickFormatter={(tick) => formatPercent(tick, 0)} /> */}
        <Tooltip formatter={(val) => formatPercent(val, 2)} />
        <Legend />
        <Bar dataKey="ETH" stackId="a" fill={COLORS.ETH} />
        <Bar dataKey="UMBR" stackId="a" fill={COLORS.UMBR} />
        <Bar dataKey="USDT" stackId="a" fill={COLORS.USDT} />
        <Bar dataKey="USDC" stackId="a" fill={COLORS.USDC} />
        <Bar dataKey="MATIC" stackId="a" fill={COLORS.MATIC} />
        <Bar dataKey="GHST" stackId="a" fill={COLORS.GHST} />
        <Bar dataKey="WBTC" stackId="a" fill={COLORS.WBTC} />
      </BarChart>
    </ResponsiveContainer>
  );
}
