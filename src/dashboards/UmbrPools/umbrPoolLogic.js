import CoinGecko from "../../logic/coinGeckoApi";
import UmbriaApi from "../../logic/umbriaApi";
import { getEpochMinus } from "../../logic/utils";
import NETWORKS from "../../constants/networks";
import { formatPercent } from "../../logic/utils";
const umbria = new UmbriaApi();
const coingecko = new CoinGecko();
const currentPrices = {};
/** Get APR Breakdown for UMBR Staking
 *
 * Does not take into account APY earnings from earned coins, so this is only APR.
 *
 * Uses current UMBR TVL for calculations, so the higher the number of days, the less accurate aprs may be.
 */
export async function getUmbrPoolAprBreakdown(network, days = 1) {
  const epoch = getEpochMinus({ days });
  let mainNetTvls = umbria.getTvlAll(network);

  /**Ethereum network UMBR stakers also get rewards from all other
   * bridges that don't have the umbr token on their network */
  let networks;
  networks =
    network === "ethereum"
      ? (networks = NETWORKS.filter(
          (network) => network.apiName !== "matic"
        ).map((network) => network.apiName))
      : (networks = [network]);

  let aprs = {};
  for (let network of networks) {
    let bridgeVols = umbria.getTotalBridgeVolume(network, epoch);
    let tvls = umbria.getTvlAll(network);
    [tvls, mainNetTvls, bridgeVols] = await Promise.all([
      tvls,
      mainNetTvls,
      bridgeVols,
    ]);

    const umbrTvl = +mainNetTvls.assets.UMBR;
    tvls = tvls.assets;

    for (let asset of Object.keys(bridgeVols)) {
      let dailyAvgBridgeVol = bridgeVols[asset] / days;

      // dailyReward is in native token but tvl is in USD, so convert using current price.
      let currentPrice = await getPriceBySymbol(asset);
      let dailyReward =
        asset === "UMBR"
          ? currentPrice * dailyAvgBridgeVol * (0.5 / 100)
          : currentPrice * dailyAvgBridgeVol * (0.3 / 100);

      let apr = (dailyReward / umbrTvl) * 365;
      aprs[asset] = aprs[asset] ? aprs[asset] + apr : apr;
    }
  }
  console.log(
    `${days} day average cumulative APR for staking UMBR on ${network} network: ${formatPercent(
      Object.values(aprs).reduce((a, b) => a + b)
    )}`
  );
  console.log(`Breakdown for ${network} network`, aprs);
  return aprs;
}

export function formatAprDataForApex() {}
export function formatAprDataForRechart() {}

async function getPriceBySymbol(symbol) {
  if (currentPrices[symbol]) return currentPrices[symbol];
  const price = await coingecko.getPriceBySymbol(symbol);
  currentPrices[symbol] = price;
  return price;
}
