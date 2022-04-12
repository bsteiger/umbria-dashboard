import httpService from "../services/httpService";

type CoinGeckoCoinList = {
  id: string;
  symbol: string;
  name: string;
  platforms?: Record<string, string>; // {network: contractAddress}
}[];

/** Module to use CoinGecko API */
class CoinGecko {
  baseUrl = "https://api.coingecko.com/api/v3/";
  currency = "usd";
  coinList: CoinGeckoCoinList = [];

  async updateCoinList() {
    console.log("Updating Coin List...");
    this.coinList = await this.getCoinList();
    return;
  }

  async getCoinList() {
    console.log("Getting Coin List...");
    const endpoint = `${this.baseUrl}coins/list?include_platform=true`;
    const coinList = (await _fetch(endpoint)) as CoinGeckoCoinList;
    console.log("Got Coin List.", `${coinList.length} coins.`);
    return coinList;
  }

  //* Return the first id for a given symbol
  async getIdBySymbol(symbol: string) {
    if (!this.coinList.length) {
      await this.updateCoinList();
    }
    const coinList = await this.coinList;
    const coin = coinList.filter(
      (c) => c.symbol.toLowerCase() === symbol.toLowerCase()
    )[0];
    return coin.id;
  }

  async getIdByContractAddress(address: string, platform: string) {}

  async getPriceById(id: string, currency = this.currency) {
    console.log(`Getting price for id:${id}`);
    const endpoint = `${this.baseUrl}coins/${id}`;
    const data = await _fetch(endpoint);
    const price = +data.market_data.current_price[currency];
    console.log(price);
    return price;
  }

  async getPriceBySymbol(symbol: string) {
    console.log(`Getting price for symbol:${symbol}`);
    const id = await this.getIdBySymbol(symbol);
    return await this.getPriceById(id);
  }
}

/** Internal function to do the api fetch and handle errors (eventually) */
async function _fetch(endpoint: string) {
  const resp = await httpService.get(endpoint);
  return resp.data;
}
export default CoinGecko;
