import React, { useEffect, useState } from "react";
import "./bridgeVolumeAll.css";
// import UmbriaApi from "../../logic/umbr";
import umbria from "./bridgeVolumeLogic";
import { getEpochMinus } from "../../logic/utils";
import BridgeVolOverTimeChart from "./bridgeVolOverTime";
import _, { capitalize } from "lodash";
import { BridgeVolumeData } from "./types";
import { Network } from "../../constants/networks";

export default function BridgeVolumeAll({ showTitle = true }) {
  const [bridgeData, setBridgeData] = useState<BridgeVolumeData[]>([]);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [assets, setAssets] = useState<string[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<string>("");
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");

  useEffect(() => {
    document.title = "UMBR Dash | Average Bridge Volume";
  }, []);

  useEffect(() => {
    const getUmbrData = async () => {
      console.log("getUmbrData");
      setNetworks(await umbria.getNetworks());
      let bridgeData = await umbria.getAvgBridgeVolData();
      setBridgeData(bridgeData);
      // setAssets();
    };
    getUmbrData();
  }, []);

  useEffect(() => {
    getAssetsFromBridgeData();
  }, [bridgeData]);

  async function getAssetsFromBridgeData() {
    const assets = new Set(bridgeData.map((o) => o.asset));
    setAssets([...assets]);
  }

  function handleNetworkSelect(value: string) {
    setSelectedNetwork(value);
  }

  function handleAssetSelect(value: string) {
    setSelectedAsset(value);
  }

  function BridgeVolumeOverTime() {
    return (
      <div className="plot">
        <BridgeVolOverTimeChart
          title={
            selectedNetwork
              ? `Data for ${capitalize(selectedNetwork)} network`
              : "Data for all networks"
          }
          data={bridgeDataToPlot()}
          // network={selectedNetwork}
          // asset={"MATIC"}
        />
      </div>
    );
  }

  function bridgeDataToPlot() {
    if (!bridgeData.length) return;
    console.log(bridgeData);
    let asset = selectedAsset;
    let plots: { data: number[]; name: string }[] = [];
    console.log(bridgeData);
    for (let data of bridgeData.filter(
      (o) =>
        (!selectedNetwork || o.network === selectedNetwork) &&
        (!asset || o.asset === asset)
    )) {
      plots = [
        ...plots,
        {
          data: data.avgVolsUsd,
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
        {showTitle && <h3 className="subtitle">Average Daily Bridge Volume</h3>}
        <Selector
          defaultText="All Networks"
          onChange={handleNetworkSelect}
          items={networks.map((n) => {
            return { text: n.displayName, value: n.apiName };
          })}
        />
        <Selector
          defaultText="All Assets"
          onChange={handleAssetSelect}
          items={assets.map((asset) => {
            return { text: asset, value: asset };
          })}
        />
        <BridgeVolumeOverTime />
      </div>
    </div>
  );
}
interface SelectorProps {
  defaultText: string;
  items: { value: string; text: string }[];
  onChange: CallableFunction;
}
function Selector({ defaultText, items, onChange }: SelectorProps) {
  return (
    <select
      onChange={(e) => {
        onChange(e.target.value);
      }}
      className="form-select"
      aria-label={defaultText}
    >
      <option value={""}>{defaultText}</option>

      {items.map((item) => (
        <option value={item.value} key={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
}

// function NetworksList({ networks }) {
//   return (
//     <ul>
//       {networks.map((network) => (
//         <li key={network.apiName}>{network.displayName}</li>
//       ))}
//     </ul>
//   );
// }
