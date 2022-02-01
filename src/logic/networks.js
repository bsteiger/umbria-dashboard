const network = (displayName, apiName, nativeAddress) => {
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
	ethavax: "Ethereum<->Avalanche",
	ethmatic: "Ethereum<->Matic",
	ethbsc: "Ethereum<->BSC",
};

const NETWORKS = [
	network("Ethereum", "ethereum", NATIVEADDRESSES.ethereum),
	network("Polygon", "matic", NATIVEADDRESSES.matic),
	network("Avalanche", "avax", NATIVEADDRESSES.avax),
	network(
		"Binance Smart Chain",
		"binancesmartchain",
		NATIVEADDRESSES.binancesmartchain
	),
];

export default NETWORKS;
