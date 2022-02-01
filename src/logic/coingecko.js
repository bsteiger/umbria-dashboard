/** Module to use CoinGecko API */
class CoinGecko {
	base_url = "https://api.coingecko.com/api/v3/";
	constructor() {
		console.log("Hi From CG API 👋");
	}
	async updateCoinList() {
		const endpoint = `{base_url}coins/list`;
		const resp = await fetch(endpoint);
		this.coinList = resp;
	}
}

export default CoinGecko;
