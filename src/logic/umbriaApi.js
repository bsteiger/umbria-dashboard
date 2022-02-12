import NETWORKS, { BRIDGEDISPLAYNAMES } from "../constants/networks";
import { convertFromWei, getEpochMinus } from "./utils";
import httpService from "../services/httpService";

const http = {
  get: async (endpoint) => {
    const resp = await httpService.get(endpoint);
    return resp.data;
  },
};

export default class UmbriaApi {
  baseUrl = "https://bridgeapi.umbria.network";
  networks = NETWORKS;

  async getAllNetworks() {
    // no API endpoint exists for this. hardcoded response for now.
    if (!this.networks) {
      this.networks = await Promise.resolve(this.networks);
    }
    return this.networks;
  }

  /** Get the APY (annual percentage yield) for all assets on a single network */
  async getApyAll(network) {
    const endpoint = `${this.baseUrl}/api/pool/getApyAll/?network=${network}`;
    return await http.get(endpoint);
  }

  /** Get the volume of liquidity currently provided by an address, for a
   * particular asset on a single network */
  async getStaked(tokenAddress, userAddress, network) {
    const endpoint =
      `${this.baseUrl}/api/pool/getStaked/?tokenAddress=` +
      `${tokenAddress}&userAddress=${userAddress}&network=${network}`;
    return await http.get(endpoint);
  }

  /** Get the total value of locked liquidity currently provided for all assets
   * on a single network */
  async getTvlAll(network) {
    const endpoint = `${this.baseUrl}/api/pool/getTvlAll/?network=${network}`;
    return await http.get(endpoint);
  }

  /** Check the availability of the api */
  async getAvailability() {
    const endpoint = `${this.baseUrl}/api/getAvailability/?`;
    return await http.get(endpoint);
  }

  /** Get the amount of liquidity available for a single transaction in each
   * asset on each network
   *
   * Also returns contract addresses on each network
   * */
  async getAvailableLiquidityAll() {
    const endpoint = `${this.baseUrl}/api/bridge/getAvailableLiquidityAll/?`;
    return await http.get(endpoint);
  }

  /** Get the amount of liquidity available for a single transaction of a single
   * asset on a given network	 */
  async getAvailableLiquidity(network, currencyAddress) {
    const endpoint =
      `${this.baseUrl}/api/bridge/getAvailableLiquidity/` +
      `?network=${network}&currency=${currencyAddress}`;
    return await http.get(endpoint);
  }

  /** Get the network fee cost for the bridge transaction */
  async getGasPrice(network) {
    const endpoint = `${this.baseUrl}/api/bridge/getGasPrice/?network=${network}`;
    return await http.get(endpoint);
  }

  /** Get APY Bridge Routes */
  async getAPYAllBridgeRoutes(network) {
    const endpoint =
      `${this.baseUrl}/api/pool/getAPYAllBridgeRoutes/` +
      `?&network=${network}`;
    const data = await http.get(endpoint);
    return data;
  }

  /**Get total bridge volume from timeSince to now for all
   * assets on a single network side of a bridge
   *
   * @param {str} network - Network name eg. matic, ethereum
   * @param {int} timeSince - EpochTime in Seconds
   */
  async getTotalBridgeVolume(network, timeSince) {
    if (!timeSince) timeSince = getEpochMinus({ days: 1 });
    const endpoint = `${this.baseUrl}/api/bridge/getAvgBridgeVolumeAll/?network=${network}&timeSince=${timeSince}`;
    let totalBridgeVolumeAll = await http.get(endpoint);
    return formatBridgeVolData(totalBridgeVolumeAll.result);
  }

  /** Get All the Apys for All Networks using the getBridgeVolumeAll endpoint
   *
   * Formated to array of objects with the following keys: network,bridge,asset,apy
   * @returns {obj[]}
   */
  async getAllApysAllNetworks() {
    let allApys = [];
    for (let network of NETWORKS) {
      allApys = [...allApys, this.getAPYAllBridgeRoutes(network.apiName)];
    }
    allApys = await Promise.all(allApys);
    let outputdata = [];
    let i = 0;
    for (let network of allApys) {
      for (let bridge in network) {
        for (let asset in network[bridge]) {
          outputdata.push({
            network: NETWORKS[i].displayName,
            bridge: BRIDGEDISPLAYNAMES[bridge],
            asset,
            apy: +network[bridge][asset],
          });
        }
      }
      i++;
    }
    return outputdata;
  }
}

/** Swaps property name of an object
 *
 * @param {Object} o
 * @param {str} oldProp
 * @param {str} newProp
 */
function swapProp(o, oldProp, newProp) {
  // don't do anything if the old prop is undefined
  if (!o || o[oldProp] == null) return o;

  // Don't overwrite a prop that already exists
  if (!!o[newProp]) return o;

  o[newProp] = o[oldProp];
  delete o[oldProp];
  return o;
}

/** Formats result from getAvgBridgeVolAll endpoint to align with standard formats */
function formatBridgeVolData(data) {
  let formatted = data;
  formatted = swapProp(formatted, "ether", "ETH");
  formatted = swapProp(formatted, "ghost", "GHST");
  formatted = swapProp(formatted, "tether", "USDT");
  formatted = swapProp(formatted, "umbria", "UMBR");
  formatted = swapProp(formatted, "usdc", "USDC");
  formatted = swapProp(formatted, "wbtc", "WBTC");

  Object.entries(formatted).map(
    ([k, v]) => (formatted[k] = convertFromWei(+v))
  );
  return formatted;
}
