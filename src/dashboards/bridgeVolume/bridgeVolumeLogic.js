import "../../umbria.typedefinitions";
import UmbriaApi from "../../logic/umbriaApi";
import { getEpochMinus } from "../../logic/utils";
import CoinGecko from "../../logic/coinGeckoApi";
import _ from "lodash";
import promiseAllProperties from "promise-all-properties";

const api = new UmbriaApi();

export default {
  /** Gets average bridge volume for the past 30, 14, 7, and 1 days
   *
   *
   */
  getAvgBridgeVolData: async () => {
    const days = [30, 14, 7, 1];
    const networks = await api.getAllNetworks();
    let data = [];
    let promises = [];

    for (let n of networks) {
      for (let day of days) {
        let epoch = getEpochMinus({ days: day });
        promises = [...promises, api.getTotalBridgeVolume(n.apiName, epoch)];
        data = [...data, { day: day, network: n.apiName }];
      }
    }
    let resolvedData = await Promise.all(promises);
    for (let i in data) {
      data[i].data = resolvedData[i];
    }
    return formatBridgeData(data);
  },

  getNetworks: async () => {
    return api.getAllNetworks();
  },
};

let prices = {};
const coingecko = new CoinGecko();

async function getPrice(symbol) {
  if (prices[symbol]) {
    return prices[symbol];
  }
  let price = await coingecko.getPriceBySymbol(symbol);
  prices[symbol] = price;
  return price;
}

//** formats and averages bridge data to represent average daily volume */
async function formatBridgeData(data) {
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
  await coingecko.updateCoinList();
  for (let asset of assets) {
    prices[asset] = coingecko.getPriceBySymbol(asset);
  }
  prices = await promiseAllProperties(prices);
  console.log(prices);
  let networks = new Set(rawData.map((o) => o.network));
  let newEntries = [];
  for (let network of networks) {
    for (let asset of assets) {
      let entry = rawData.filter(
        (o) => o.network === network && o.asset === asset
      );
      if (!entry.length) continue;
      newEntries = [
        ...newEntries,
        {
          network,
          asset,
          price: prices[asset],
          days: entry.map((o) => `${o.day}d`),
          totalVols: entry.map((o) => o.total),
          totalVolsUsd: entry.map((o) => o.total * prices[asset]),
          avgVols: entry.map((o) => o.avg),
          avgVolsUsd: entry.map((o) => o.avg * prices[asset]),
        },
      ];
    }
  }
  return newEntries;
}
