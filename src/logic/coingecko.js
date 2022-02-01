/** Module to use CoinGecko API */
class CoinGecko {
	baseUrl = "https://api.coingecko.com/api/v3/";
	// coinList = null;

	constructor() {
		console.log("Hi From CG API Constructor👋");
	}

	/** Internal method to do the api fetch and handle errors (eventually) */
	async _apiFetch(endpoint) {
		let response = await fetch(endpoint);
		console.log(response);
		let json = await response.json();
		return json;
	}

	async updateCoinList() {
		console.log("Updating Coin List...");
		this.coinList = await this.getCoinList();
		console.log("Updated Coin List.");
		console.log(this.coinList);
		return;
	}

	async getCoinList() {
		console.log("Getting Coin List...");
		const endpoint = `${this.baseUrl}coins/list?include_platform=true`;
		// const endpoint = https://api.coingecko.com/api/v3/coins/list?include_platform=true
		const resp = await fetch(endpoint);
		const coinList = await resp.json();
		console.log("Got Coin List.", this.coinList);
		return coinList;
	}

	//* Return the first id for a given symbol
	async getIdBySymbol(symbol) {
		console.log(`Getting ID for ${symbol}`);
		if (!this.coinList) {
			await this.updateCoinList();
			console.log(this.coinList);
		}
		const coinList = await this.coinList;
		const coin = coinList.filter(
			(c) => c.symbol.toLowerCase() === symbol.toLowerCase()
		)[0];
		console.log(coin);
		return coin;
	}

	async getIdByContractAddress(address, platform) {}

	async getPriceBySymbol(symbol) {
		console.log(`Getting price for ${symbol}`);
		const id = await this.getIdBySymbol(symbol);

		return;
	}

	async getCurrentUmbrPrice() {
		null;
	}
}

export default CoinGecko;
