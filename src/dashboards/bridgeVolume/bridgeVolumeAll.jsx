import React, { useEffect, useState } from "react";
import "./bridgeVolumeAll.css";
// import UmbriaApi from "../../logic/umbr";
import umbria from "./umbria";
import { getEpochMinus } from "../../../src/logic/utils";
import BridgeVolOverTimeChart from "./bridgeVolOverTime";
import _ from "lodash";

export default function BridgeVolumeAll() {
  const [bridgeData, setBridgeData] = useState([]);
  const [networks, setNetworks] = useState([]);
  const [selectedBridge, setSelectedBridge] = useState("");
  const [selectedNetwork, setselectedNetwork] = useState("");

  useEffect(() => {
    const getUmbrData = async () => {
      console.log("getUmbrData");
      setNetworks(await umbria.getNetworks());
      setBridgeData(await umbria.getBridgeData());
    };
    getUmbrData();
  }, []);

  function handleNetworkSelect(value) {
    setselectedNetwork(value);
  }

  function BridgeVolumeOverTime() {
    return (
      <div className="plot">
        <BridgeVolOverTimeChart
          title={
            selectedNetwork
              ? `Data for ${selectedNetwork}`
              : "Please select a network"
          }
          data={bridgeDataToPlot()}
          network={selectedNetwork}
          asset={"ETH"}
        />
      </div>
    );
  }

  function bridgeDataToPlot() {
    if (!bridgeData.length) return;
    console.log(bridgeData);
    let asset = "ETH";
    let plots = [];
    for (let data of bridgeData.filter((o) => o.asset === asset)) {
      plots = [
        ...plots,
        {
          // data: _.zip(data.days, data.avgVols),
          data: data.avgVols,
          name: `${data.asset} (${data.network})`,
        },
      ];
    }
    return plots;
  }

  /** --- Main Render --- */
  return (
    <div>
      <div className="container">
        <h3 className="title">Average Bridge Volume</h3>
        <NetworksSelector onChange={handleNetworkSelect} networks={networks} />
        <BridgeVolumeOverTime />
      </div>
    </div>
  );
}

function NetworksSelector({ networks, onChange }) {
  return (
    <select
      onChange={(e) => {
        onChange(e.target.value);
      }}
      className="form-select"
      aria-label="Select Network"
    >
      <option value={null} defaultValue={true}>
        Select Network
      </option>

      {networks.map((network) => (
        <option value={network.apiName} key={network.apiName}>
          {network.displayName}
        </option>
      ))}
    </select>
  );
}

function NetworksList({ networks }) {
  return (
    <ul>
      {networks.map((network) => (
        <li key={network.apiName}>{network.displayName}</li>
      ))}
    </ul>
  );
}
