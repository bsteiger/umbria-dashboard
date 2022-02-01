import NETWORKS from "./networks";

export default class UmbriaApi {
	baseUrl = "https://bridgeapi.umbria.network";

	/** Internal method to do the api fetch and handle errors (eventually)
	 *
	 * @param {str} endpoint
	 * @returns {Promise.<object>} json object
	 */
	async _apiFetch(endpoint) {
		let response = await fetch(endpoint);
		console.log(response);
		let json = await response.json();
		return json;
	}

	/** Get the number of liquidity providers for a particular asset on a single
	 * network */
	async getNumParticipants(network, tokenAddress) {
		const endpoint =
			`${this.baseUrl}/api/pool/getNumParticipants/` +
			`?network=${network}&tokenAddress=${tokenAddress}`;
		return this._apiFetch(endpoint);
	}

	/** Get the APY (annual percentage yield) for all assets on a single network */
	async getApyAll(network) {
		const endpoint = `${this.baseUrl}/api/pool/getApyAll/?network=${network}`;
		return this._apiFetch(endpoint);
	}

	/** Get the volume of liquidity currently provided by an address, for a
	 * particular asset on a single network */
	async getStaked(tokenAddress, userAddress, network) {
		const endpoint =
			`${this.baseUrl}/api/pool/getStaked/?tokenAddress=` +
			`${tokenAddress}&userAddress=${userAddress}&network=${network}`;
		return this._apiFetch(endpoint);
	}

	/** Get the total value of locked liquidity currently provided for all assets
	 * on a single network */
	async getTvlAll(network) {
		const endpoint = `${this.baseUrl}/api/pool/getTvlAll/?network=${network}`;
		return this._apiFetch(endpoint);
	}

	/** Check the availability of the api */
	async getAvailability() {
		const endpoint = `${this.baseUrl}/api/getAvailability/?`;
		return await this._apiFetch(endpoint);
	}

	/** Get the currenct status of a Narni Bridge transaction */
	async getTransactionInfo(txHash) {
		const endpoint = `${this.baseUrl}/api/bridge/getTransactionInfo/?txhash=${txHash}`;
		return await this._apiFetch(endpoint);
	}

	/** Get the amount of liquidity available for a single transaction in each
	 * asset on each network
	 *
	 * Also returns contract addresses on each network
	 * */
	async getAvailableLiquidityAll() {
		const endpoint = `${this.baseUrl}/api/bridge/getAvailableLiquidityAll/?`;
		return await this._apiFetch(endpoint);
	}

	/** Get the amount of liquidity available for a single transaction of a single
	 * asset on a given network	 */
	async getAvailableLiquidity(network, currencyAddress) {
		const endpoint =
			`${this.baseUrl}/api/bridge/getAvailableLiquidity/` +
			`?network=${network}&currency=${currencyAddress}`;
		return await this._apiFetch(endpoint);
	}

	/** Get the network fee cost for the bridge transaction */
	async getGasPrice(network) {
		const endpoint = `${this.baseUrl}/api/bridge/getGasPrice/?network=${network}`;
		return await this._apiFetch(endpoint);
	}

	/** Get APY Bridge Routes */
	async getAPYAllBridgeRoutes(network) {
		const endpoint =
			`${this.baseUrl}/api/pool/getAPYAllBridgeRoutes/` +
			`?&network=${network}`;
		return await this._apiFetch(endpoint);
	}

	/**Get Average bridge volume over timeSince to now for all
	 * assets on a single network side of a bridge
	 *
	 * @param {str} network - Network name eg. matic, ethereum
	 * @param {int} timeSince - EpochTime in Seconds
	 */
	async getAvgBridgeVolumeAll(network, timeSince) {
		const endpoint = `${this.baseUrl}/api/bridge/getAvgBridgeVolumeAll/?network=${network}&timeSince=${timeSince}`;
		let avgBridgeVolumeAll = await this._apiFetch(endpoint);
		let result = avgBridgeVolumeAll.result;
		return formatBridgeVolData(result);
	}

	async getAvgBridgeVolumesAllNetworks(timeSince) {
		let data = {};
		for (let n of NETWORKS) {
			let network = n.apiName;
			let bridgeVolume = await this.getAvgBridgeVolumeAll(network, timeSince);
			data[network] = bridgeVolume;
		}

		return data;
	}

	async getAllNetworksApy() {
		let allApys = NETWORKS.map((network) => {
			const apys = this.getAPYAllBridgeRoutes(network.apiName);
			return apys;
		});
		allApys = await Promise.all(allApys);

		let outputdata = [];
		let i = 0;
		for (let network of allApys) {
			for (let bridge in network) {
				for (let asset in network[bridge]) {
					outputdata.push({
						network: NETWORKS[i].displayName,
						bridge,
						asset,
						apy: network[bridge][asset],
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
	if (o[oldProp] == null) return o;

	// Don't overwrite a prop that already exists
	if (!!o[newProp]) return o;

	o[newProp] = o[oldProp];
	delete o[oldProp];
	return o;
}

/** Formats result from getAvgBridgeVolAll to align with standard formats */
function formatBridgeVolData(data) {
	let formatted = data;
	formatted = swapProp(formatted, "ether", "ETH");
	formatted = swapProp(formatted, "ghost", "GHST");
	formatted = swapProp(formatted, "tether", "USDT");
	formatted = swapProp(formatted, "umbria", "UMBR");
	formatted = swapProp(formatted, "usdc", "USDC");
	formatted = swapProp(formatted, "wbtc", "WBTC");
	return formatted;
}
