import "../../umbria.typedefinitions";
import UmbriaApi from "../../logic/umbr";
import { getEpochMinus } from "../../logic/utils";
import BridgeVolumeAll from "./bridgeVolumeAll";
const api = new UmbriaApi();

export default {
  getBridgeData: async () => {
    const days = [30, 14, 7, 1];

    const networks = await api.getAllNetworks();

    let data = [];
    let promises = [];
    for (let n of networks) {
      for (let day of days) {
        let epoch = getEpochMinus({ days: day });
        let fetchedData = await api.getBridgeVolumeAll(n.apiName, epoch);
        promises = [...promises, fetchedData];
        data = [...data, { day: day, network: n.apiName, data: fetchedData }];
      }
    }
    await Promise.all(promises);
    return formatBridgeData(data);
  },
  getNetworks: async () => {
    return api.getAllNetworks();
  },
};

function formatBridgeData(data) {
  let rawData = [];
  for (let entry of data) {
    for (let asset in entry.data) {
      rawData = [
        ...rawData,
        {
          network: entry.network,
          day: entry.day,
          total: entry.data[asset],
          avg: entry.data[asset] / entry.day,
          asset,
        },
      ];
    }
  }
  let assets = new Set(rawData.map((o) => o.asset));
  let networks = new Set(rawData.map((o) => o.network));
  let newEntries = [];
  for (let network of networks) {
    for (let asset of assets) {
      let entry = rawData.filter(
        (o) => o.network === network && o.asset === asset
      );
      if (!entry.length) continue;
      console.log(entry);
      newEntries = [
        ...newEntries,
        {
          network,
          asset,
          days: entry.map((o) => `${o.day}d`),
          totalVols: entry.map((o) => o.total),
          avgVols: entry.map((o) => o.avg),
        },
      ];
    }
  }
  return newEntries;
}
