import React, { useState, useMemo, useEffect } from "react";
// import UmbrPrice from "../../components/umbrprice";
import CoinGecko from "../../logic/coinGeckoApi";
import UmbriaApi from "../../logic/umbriaApi";
// import AllNetworksAllApys from "../../components/allNetworksAllApys";
import TableAllApys from "../../components/TableAllApys";
import BridgeVolumeAll from "../bridgeVolume/BridgeVolumeAll";
import { ApyData } from "../../constants/types";
import { Web3Address } from "../../components/Web3Address";
import { useWeb3Context } from "../../context/Web3Context";

/** Overview Dashboard Page
 *
 * Displays:
 * - Current UMBR Price
 * - Table of apys for each network from the UMBR Endpoint
 */
function Overview() {
  const userWallet = useWeb3Context().address;
  const [umbrPrice, setUmbrPrice] = useState(NaN);
  const [allNetworksAllApys, setAllNetworksAllApys] = useState<ApyData[]>([]);
  const coingecko = useMemo(() => new CoinGecko(), []);

  useEffect(() => {
    document.title = umbrPrice
      ? `UMBR Dash | Overview ($${umbrPrice})`
      : `UMBR Dash | Overview`;
  }, [umbrPrice]);

  useEffect(() => {
    async function getCurrentUmbrPrice() {
      console.log(`app.getCurrentUmbrPrice()`);
      setUmbrPrice(await coingecko.getPriceById("umbra-network"));
    }
    async function getAllNetworksApys() {
      let data = await umbriaApi.getAllApysAllNetworks();
      data = data.filter((item) => item.network && item.asset && item.bridge);
      setAllNetworksAllApys(data);
    }
    getCurrentUmbrPrice();
    getAllNetworksApys();
  }, [coingecko]);

  return (
    <div className="overview-page">
      <div className="container">
        {userWallet && <Web3Address></Web3Address>}
        <div className="row mt-2">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  ${umbrPrice > 0 ? umbrPrice.toFixed(2) : " -- "}
                </h5>
                <h6 className="card-subtitle mb-2">UMBR Price</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h6 className="card-title">Umbria Narni Pool Current APY</h6>
                <TableAllApys data={allNetworksAllApys}></TableAllApys>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h6 className="card-title">Average Daily Bridge Volume</h6>
                <BridgeVolumeAll showTitle={false}></BridgeVolumeAll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const umbriaApi = new UmbriaApi();

export default Overview;
