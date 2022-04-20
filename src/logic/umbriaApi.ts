import NETWORKS, {
  BRIDGEDISPLAYNAMES,
  Bridge,
  getBridgeFromAddress,
} from "../constants/networks";
import { convertFromWei, getEpochMinus } from "./utils";
import httpService from "../services/httpService";
import { ApyData, OverviewData, TvlData } from "../constants/types";
import _ from "lodash";

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
    return (await http.get(endpoint)) as TvlAll;
  }

  /** Get the total value of locked liquidity currently provided for all assets
   * on a single network */
  async getTvlAllBridgeRoutes(network: string) {
    const endpoint = `${this.baseUrl}/api/pool/getTvlAllBridgeRoutes/?network=${network}`;
    return (await http.get(endpoint)) as TvlAllBridgeRoutes;
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
    return (await http.get(endpoint)) as ApyAllBridgeRoutes;
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

  async getAllTvlsAllNetworks(): Promise<TvlData[]> {
    let allTvlData: TvlData[] = [];
    let promises: Promise<TvlAllBridgeRoutes>[] = [];
    for (let network of NETWORKS) {
      promises.push(this.getTvlAllBridgeRoutes(network.apiName));
    }
    let responses = await Promise.all(promises);
    responses.map((response, i) => {
      for (let bridgeAddress in response.assets) {
        const bridge = getBridgeFromAddress(bridgeAddress);
        for (let asset in response.assets[bridgeAddress]) {
          if (bridge) {
            allTvlData.push({
              asset: asset,
              bridge: bridge as Bridge,
              network: NETWORKS[i],
              tvlUsd: +response.assets[bridgeAddress][asset],
            });
          }
        }
      }
    });
    return allTvlData;
  }

  static buildOverviewData(apys: ApyData[], tvls: TvlData[]): OverviewData[] {
    let overviewData: OverviewData[] = [];

    apys.map(({ bridge, network, asset, apy }) => {
      const tvlUsd = _.find(tvls, {
        network: network,
        bridge: bridge,
        asset: asset,
      })?.tvlUsd;
      overviewData.push({ apy, asset, bridge, network, tvlUsd: tvlUsd || NaN });
    });

    tvls.map(({ bridge, network, asset, tvlUsd }) => {
      const entry = _.find(overviewData, { network, asset, bridge });
      if (entry && entry.tvlUsd) {
        return;
      }

      if (entry && !entry.tvlUsd) {
        entry.tvlUsd = tvlUsd;
        return;
      }

      overviewData.push({ bridge, network, asset, tvlUsd, apy: NaN });
    });
    return overviewData;
  }

  /** Get All the Apys for All Networks using the getBridgeVolumeAll endpoint   */
  async getAllApysAllNetworks(): Promise<ApyData[]> {
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
            network: NETWORKS[i],
            bridge: bridge as Bridge,
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

/** Swaps property name of an object */
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

//API Response Interfaces
interface TvlAllBridgeRoutes {
  error: string;
  network: string;
  totalValue: string;
  assets: { [bridgeAddress: string]: { [asset: string]: string } };
}
interface TvlAll {
  error: string;
  network: string;
  totalValue: string;
  assets: {
    [asset: string]: string;
  };
}

interface ApyAllBridgeRoutes {
  [bridge: string]: { [asset: string]: string };
}
