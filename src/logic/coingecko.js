/** Module to use CoinGecko API */
class CoinGecko {
	baseUrl = "https://api.coingecko.com/api/v3/";
	currency = "usd";

	async updateCoinList() {
		console.log("Updating Coin List...");
		this.coinList = await this.getCoinList();
		return;
	}

	async getCoinList() {
		console.log("Getting Coin List...");
		const endpoint = `${this.baseUrl}coins/list?include_platform=true`;
		const resp = await _fetch(endpoint);
		const coinList = await resp.json();
		console.log("Got Coin List.", `${coinList.length} coins.`);
		return coinList;
	}

	//* Return the first id for a given symbol
	async getIdBySymbol(symbol) {
		if (!this.coinList) {
			await this.updateCoinList();
		}
		const coinList = await this.coinList;
		const coin = coinList.filter(
			(c) => c.symbol.toLowerCase() === symbol.toLowerCase()
		)[0];
		return coin.id;
	}

	async getIdByContractAddress(address, platform) {}

	async getPriceById(id, currency = this.currency) {
		console.log(`Getting price for id:${id}`);
		const endpoint = `${this.baseUrl}coins/${id}`;
		const resp = await _fetch(endpoint);
		const json = await resp.json();
		const price = json.market_data.current_price[this.currency];
		return price;
	}

	async getPriceBySymbol(symbol) {
		console.log(`Getting price for symbol:${symbol}`);
		const id = await this.getIdBySymbol(symbol);
		return await this.getPriceById(id);
	}
}

/** Internal function to do the api fetch and handle errors (eventually) */
async function _fetch(endpoint) {
	console.log("Req:", endpoint);
	let response = await fetch(endpoint);
	console.log(response);
	return response;
}
export default CoinGecko;
