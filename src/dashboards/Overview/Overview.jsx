import React, { useState, useEffect } from "react";
import UmbrPrice from "../../components/umbrprice";
import CoinGecko from "../../logic/coinGeckoApi";
import UmbriaApi from "../../logic/umbriaApi";
import AllNetworksAllApys from "../../components/allNetworksAllApys";

/** Overview Dashboard Page
 *
 * Displays:
 * - Current UMBR Price
 * - Table of apys for each network from the UMBR Endpoint
 */
function Overview() {
  const [umbrPrice, setUmbrPrice] = useState("");
  const [allNetworksAllApys, setAllNetworksAllApys] = useState([]);
  const coingecko = new CoinGecko();

  useEffect(() => {
    async function getCurrentUmbrPrice() {
      console.log(`app.getCurrentUmbrPrice()`);
      setUmbrPrice(await coingecko.getPriceById("umbra-network"));
    }
    async function getAllNetworksApys() {
      setAllNetworksAllApys(await umbriaApi.getAllApysAllNetworks());
    }
    getCurrentUmbrPrice();
    getAllNetworksApys();
  }, []);

  return (
    <div class="overview-page">
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              ${umbrPrice > 0 ? umbrPrice.toFixed(2) : " -- "}
            </h5>
            <h6 className="card-subtitle mb-2">UMBR Price</h6>
          </div>
        </div>
        <AllNetworksAllApys data={allNetworksAllApys} />
      </div>
    </div>
  );
}

const umbriaApi = new UmbriaApi();

export default Overview;
