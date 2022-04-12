export const NATIVEADDRESSES = {
  ethereum: "0xETH",
  matic: "0xMATIC",
  binancesmartchain: "0xBNB",
  avax: "0xAVAX",
};

//Render Colors for Rechart
export const COLORS = {
  MATIC: "#9f72ea",
  ETH: "#626890",
  UMBR: "#272727",
  GHST: "#fc16f4",
  USDT: "#50af95",
  USDC: "#2775ca",
  WBTC: "#f09243",
};

export const BRIDGES = [
  "ethavax",
  "ethmatic",
  "ethbsc",
  "ethfantom",
  "etharbitrum",
] as const;

export type Bridge = typeof BRIDGES[number];

export const BRIDGEDISPLAYNAMES: { [B in Bridge]: string } = {
  ethavax: "Ethereum ↔ Avalanche",
  ethmatic: "Ethereum ↔ Polygon",
  ethbsc: "Ethereum ↔ Binance Smart Chain",
  etharbitrum: "Ethereum ↔ Arbitrum",
  ethfantom: "Ethereum ↔ Fantom",
};

export type Network = {
  displayName: string;
  apiName: string;
  bridges: Bridge[];
  nativeAddress?: string;
};

const NETWORKS: Network[] = [
  {
    displayName: "Ethereum",
    apiName: "ethereum",
    nativeAddress: NATIVEADDRESSES.ethereum,
    bridges: ["etharbitrum", "ethavax", "ethbsc", "ethfantom", "ethmatic"],
  },
  {
    displayName: "Polygon",
    apiName: "matic",
    nativeAddress: NATIVEADDRESSES.matic,
    bridges: ["ethmatic"],
  },
  {
    displayName: "Avalanche",
    apiName: "avax",
    nativeAddress: NATIVEADDRESSES.avax,
    bridges: ["ethavax"],
  },
  {
    displayName: "Binance Smart Chain",
    apiName: "binancesmartchain",
    nativeAddress: NATIVEADDRESSES.binancesmartchain,
    bridges: ["ethbsc"],
  },
  {
    displayName: "Fantom",
    apiName: "fantom",
    bridges: ["ethfantom"],
  },
  {
    displayName: "Arbitrum",
    apiName: "arbitrum",
    bridges: ["etharbitrum"],
  },
];

export default NETWORKS;
