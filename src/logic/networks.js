const Network = (displayName, apiName, nativeAddress) => {
	return {
		displayName,
		apiName,
		nativeAddress,
	};
};

export function getDisplayName(network) {
	return "";
}

export const NATIVEADDRESSES = {
	ethereum: "0xETH",
	matic: "0xMATIC",
	binancesmartchain: "0xBNB",
	avax: "0xAVAX",
};

export const BRIDGEDISPLAYNAMES = {
	ethavax: "Ethereum ↔ Avalanche",
	ethmatic: "Ethereum ↔ Matic",
	ethbsc: "Ethereum ↔ Binance Smart Chain",
};

const NETWORKS = [
	new Network("Ethereum", "ethereum", NATIVEADDRESSES.ethereum),
	new Network("Polygon", "matic", NATIVEADDRESSES.matic),
	new Network("Avalanche", "avax", NATIVEADDRESSES.avax),
	new Network(
		"Binance Smart Chain",
		"binancesmartchain",
		NATIVEADDRESSES.binancesmartchain
	),
];

export default NETWORKS;
