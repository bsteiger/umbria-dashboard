import { Network, Bridge } from "./networks";

/**
 * Interface for APY Table Data
 */
export type ApyData = {
  apy: number;
  asset: string;
  bridge: Bridge;
  network: Network;
};

export type TvlData = {
  tvlUsd: number;
  asset: string;
  bridge: Bridge;
  network: Network;
};

export type OverviewData = TvlData & ApyData;
