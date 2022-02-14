/**
 * @param {string} displayName
 * @param {string} apiName
 * @param {string} nativeAddress
 * @returns {Network}
 */
function Network(displayName, apiName, nativeAddress) {
  return {
    displayName,
    apiName,
    nativeAddress,
  };
}

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

export const BRIDGEDISPLAYNAMES = {
  ethavax: "Ethereum ↔ Avalanche",
  ethmatic: "Ethereum ↔ Polygon",
  ethbsc: "Ethereum ↔ Binance Smart Chain",
};

const NETWORKS = [
  Network("Ethereum", "ethereum", NATIVEADDRESSES.ethereum),
  Network("Polygon", "matic", NATIVEADDRESSES.matic),
  Network("Avalanche", "avax", NATIVEADDRESSES.avax),
  Network(
    "Binance Smart Chain",
    "binancesmartchain",
    NATIVEADDRESSES.binancesmartchain
  ),
];

export default NETWORKS;
