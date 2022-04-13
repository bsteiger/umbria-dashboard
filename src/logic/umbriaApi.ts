import NETWORKS, { BRIDGEDISPLAYNAMES, Bridge } from "../constants/networks";
import { convertFromWei, getEpochMinus } from "./utils";
import httpService from "../services/httpService";

const http = {
  get: async (endpoint: string) => {
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
  async getApyAll(network: string) {
    const endpoint = `${this.baseUrl}/api/pool/getApyAll/?network=${network}`;
    return await http.get(endpoint);
  }

  /** Get the volume of liquidity currently provided by an address, for a
   * particular asset on a single network */
  async getStaked(tokenAddress: string, userAddress: string, network: string) {
    const endpoint =
      `${this.baseUrl}/api/pool/getStaked/?tokenAddress=` +
      `${tokenAddress}&userAddress=${userAddress}&network=${network}`;
    return await http.get(endpoint);
  }

  /** Get the total value of locked liquidity currently provided for all assets
   * on a single network */
  async getTvlAll(network: string) {
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
  async getAvailableLiquidity(network: string, currencyAddress: string) {
    const endpoint =
      `${this.baseUrl}/api/bridge/getAvailableLiquidity/` +
      `?network=${network}&currency=${currencyAddress}`;
    return await http.get(endpoint);
  }

  /** Get the network fee cost for the bridge transaction */
  async getGasPrice(network: string) {
    const endpoint = `${this.baseUrl}/api/bridge/getGasPrice/?network=${network}`;
    return await http.get(endpoint);
  }

  /** Get APY Bridge Routes */
  async getAPYAllBridgeRoutes(network: string) {
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
  async getTotalBridgeVolume(network: string, timeSince: number) {
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
    type ApiResponse = { [bridge in Bridge]?: { [asset: string]: string } };

    let promises: Promise<ApiResponse>[] = [];
    for (let network of NETWORKS) {
      promises = [...promises, this.getAPYAllBridgeRoutes(network.apiName)];
    }

    const allApys = await Promise.all(promises);
    let outputdata = [];
    let i = 0;
    for (let network of allApys) {
      for (let bridge in network) {
        for (let asset in network[bridge as Bridge]) {
          outputdata.push({
            network: NETWORKS[i].displayName,
            bridge: BRIDGEDISPLAYNAMES[bridge as Bridge],
            asset,
            apy: Number(network?.[bridge as Bridge]?.[asset]),
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
function swapProp(o: Record<string, any>, oldProp: string, newProp: string) {
  // don't do anything if the old prop is undefined
  if (!o || o[oldProp] == null) return o;

  // Don't overwrite a prop that already exists
  if (!!o[newProp]) return o;

  o[newProp] = o[oldProp];
  delete o[oldProp];
  return o;
}

/** Formats result from getAvgBridgeVolAll endpoint to align with standard formats */
function formatBridgeVolData(data: Record<string, any>) {
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
