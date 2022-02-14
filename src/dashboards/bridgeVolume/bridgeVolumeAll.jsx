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
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [selectedNetwork, setselectedNetwork] = useState("");

  useEffect(() => {
    document.title = "UMBR Dash | Average Bridge Volume";
  }, []);

  useEffect(() => {
    const getUmbrData = async () => {
      console.log("getUmbrData");
      setNetworks(await umbria.getNetworks());
      if (selectedNetwork === "") setselectedNetwork(networks[0]);
      let bridgeData = await umbria.getAvgBridgeVolData();
      setBridgeData(bridgeData);
      getAssetsFromBridgeData();
      // setAssets();
    };
    getUmbrData();
  }, []);

  async function getAssetsFromBridgeData(dat) {
    console.log(bridgeData);
  }

  function handleNetworkSelect(value) {
    setselectedNetwork(value);
  }

  function handleAssetSelect(value) {
    setSelectedAsset(value);
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
          asset={"MATIC"}
        />
      </div>
    );
  }

  function bridgeDataToPlot() {
    if (!bridgeData.length) return;
    console.log(bridgeData);
    let asset = selectedAsset;
    let plots = [];
    console.log(bridgeData);
    for (let data of bridgeData.filter(
      (o) =>
        (!selectedNetwork || o.network === selectedNetwork) &&
        (!asset || o.asset === asset)
    )) {
      plots = [
        ...plots,
        {
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
        <Selector
          defaultText="Select Network"
          onChange={handleNetworkSelect}
          items={networks}
        />
        <Selector
          defaultText="Select Asset"
          onChange={handleAssetSelect}
          items={assets}
        />
        <BridgeVolumeOverTime />
      </div>
    </div>
  );
}

function Selector({ defaultText, items, onChange }) {
  return (
    <select
      onChange={(e) => {
        onChange(e.target.value);
      }}
      className="form-select"
      aria-label={defaultText}
    >
      <option value={""} defaultValue={true}>
        {defaultText}
      </option>

      {items.map((item) => (
        <option value={item.apiName} key={item.apiName}>
          {item.displayName}
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
