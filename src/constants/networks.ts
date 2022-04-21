export const NATIVEADDRESSES = {
  ethereum: "0xETH",
  matic: "0xMATIC",
  binancesmartchain: "0xBNB",
  avax: "0xAVAX",
  arbitrum: "0xETH",
};

export const TOKENS = [
  "MATIC",
  "ETH",
  "UMBR",
  "GHST",
  "USDT",
  "USDC",
  "WBTC",
] as const;

export type Token = typeof TOKENS[number];

//Render Colors for Rechart
export const COLORS: { [T in Token]: string } = {
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
  "ethftm",
  "etharb",
] as const;

export type Bridge = typeof BRIDGES[number];

export const BRIDGEADDRESSES: { [B in Bridge]: string } & {
  [address: string]: string;
} = {
  ethmatic: "0x18c6f86ee9f099defe10b4201e48b2ef53beabd0",
  ethavax: "0x437fb1638036f25342b9e4835c11e0b7cd34495a",
  ethbsc: "0x862f84a7cd54c8edf1afc98a7a676b1ea6a27df5",
  ethftm: "0x7f2f30cbc81a9c4ce3b8a08daf4ade7541633853",
  etharb: "0x53214b879101e7f204123b773bfa0bd0748e9b8d",
};

export const TOKENSONBRIDGE: { [B in Bridge]: Token[] } = {
  ethmatic: ["MATIC", "ETH", "UMBR", "GHST", "USDT", "USDC", "WBTC"],
  ethavax: ["ETH"],
  ethbsc: ["ETH"],
  ethftm: ["ETH"],
  etharb: ["ETH"],
};

export function getBridgeFromAddress(address: string): Bridge | undefined {
  const results = Object.entries(BRIDGEADDRESSES).filter(
    (entry) => entry[1].toLowerCase() === address.toLowerCase()
  ) as [Bridge, string][];
  if (results.length == 0) return undefined;
  return results[0][0];
}

export const BRIDGEDISPLAYNAMES: { [B in Bridge]: string } = {
  ethavax: "Ethereum ↔ Avalanche",
  ethmatic: "Ethereum ↔ Polygon",
  ethbsc: "Ethereum ↔ Binance Smart Chain",
  etharb: "Ethereum ↔ Arbitrum",
  ethftm: "Ethereum ↔ Fantom",
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
    bridges: ["etharb", "ethavax", "ethbsc", "ethftm", "ethmatic"],
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
    bridges: ["ethftm"],
  },
  {
    displayName: "Arbitrum",
    apiName: "arbitrum",
    bridges: ["etharb"],
    nativeAddress: NATIVEADDRESSES.arbitrum,
  },
];

export default NETWORKS;
