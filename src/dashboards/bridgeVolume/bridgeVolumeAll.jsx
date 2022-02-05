import React, { useEffect, useState } from "react";
import styles from "./bridgeVolumeAll.module.css";
import UmbriaApi from "../../logic/umbr";
import { getEpochMinus } from "../../../src/logic/utils";

export default function BridgeVolumeAll() {
  let bridgeData = {};
  let networks = [];

  // Get bridge data on load
  useEffect(() => {
    const umbr = new UmbriaApi();
    const getUmbrData = async () => {
      networks = await umbr.getAllNetworks();

      const avg1d = await umbr.getAvgBridgeVolumesAllNetworks(
        getEpochMinus({ days: 1 })
      );
      const avg14d = await umbr.getAvgBridgeVolumesAllNetworks(
        getEpochMinus({ days: 14 })
      );
      const avg30d = await umbr.getAvgBridgeVolumesAllNetworks(
        getEpochMinus({ days: 30 })
      );
      bridgeData = { avg1d, avg14d, avg30d };
      console.log(bridgeData);
    };
    const umbrdata = getUmbrData();
  }, []);

  return (
    <div>
      <h1>
        👋Hi From Bridge Volume: <b>All</b>👋
      </h1>
    </div>
  );
}
