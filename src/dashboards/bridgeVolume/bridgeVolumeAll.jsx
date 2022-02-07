import React, { useEffect, useState } from "react";
import "./bridgeVolumeAll.css";
import UmbriaApi from "../../logic/umbr";
import { getEpochMinus } from "../../../src/logic/utils";
import BridgeVolOverTimeChart from "./bridgeVolOverTime";

export default function BridgeVolumeAll() {
  const [bridgeData, setBridgeData] = useState({});
  const [networks, setNetworks] = useState([]);
  const [selectedBridge, setSelectedBridge] = useState("");
  const [selectedNetwork, setselectedNetwork] = useState("");

  function handleNetworkSelect(value) {
    console.log("SWITCH!", value);
    setselectedNetwork(value);
  }

  useEffect(() => {
    console.log("Running Use Effect");
    const getUmbrData = async () => {
      console.log("getting Umbr Data");
      const umbr = new UmbriaApi();
      const networks = await umbr.getAllNetworks();
      setNetworks(networks);
      console.log(networks);
    };
    getUmbrData();
  }, []);

  //
  //
  //
  // const avg1d = umbr.getAvgBridgeVolumesAllNetworks(
  //   getEpochMinus({ days: 1 })
  // );
  // const avg7d = umbr.getAvgBridgeVolumesAllNetworks(
  //   getEpochMinus({ days: 7 })
  // );
  // await Promise.all([avg1d, avg7d]);
  //   const avg14d = await umbr.getAvgBridgeVolumesAllNetworks(
  //     getEpochMinus({ days: 14 })
  //   );
  //   const avg30d = await umbr.getAvgBridgeVolumesAllNetworks(
  //     getEpochMinus({ days: 30 })
  //   );
  // setBridgeData({ bridgeData: { avg1d, avg14d, avg30d } });
  // console.log("got Umbr Data");
  // };
  // }

  function BridgeVolumeOverTime() {
    return (
      <div className="plot">
        Plot for {selectedNetwork} goes here <BridgeVolOverTimeChart />
      </div>
    );
  }

  /** --- Main Render --- */
  return (
    <div>
      <div className="container">
        <h3 className="title">Bridge Volume</h3>
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
