/**
 * Interface for APY Table Data
 */
export type ApyData = {
  apy: number;
  asset: string;
  bridge: string;
  network: string;
};

export type TvlData = {
  tvlUsd: number;
  asset: string;
  bridge: string;
  network: string;
};

export type OverviewData = TvlData & ApyData;
