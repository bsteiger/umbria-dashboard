import NETWORKS from "./networks";

export default class UmbriaApi {
	baseUrl = "https://bridgeapi.umbria.network";

	/** Internal method to do the api fetch and handle errors (eventually) */
	async _apiFetch(endpoint) {
		let response = await fetch(endpoint);
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
