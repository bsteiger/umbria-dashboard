import React, { Component } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import UmberPrice from "./components/umbrprice.jsx";
import NavBar from "./components/navbar.jsx";
import networks from "./logic/networks";
import UmbriaApi from "./logic/umbr";
import AllNetworksAllApys from "./components/allNetworksAllApys";
import CoinGecko from "./logic/coingecko";
import { Switch, Route, Redirect } from "react-router-dom";
import Error404 from "./components/error404";
import BarChart from "./components/chartTest";
import BridgeVolumeAll from "./dashboards/bridgeVolume/bridgeVolumeAll";
import Test from "./components/Test";
import Overview from "./dashboards/Overview";

class App extends Component {
  state = {
    umbrPrice: null,
    networks: networks,
    allNetworksApys: null,
  };

  umbriaApi = new UmbriaApi();
  coingecko = new CoinGecko();

  async getCurrentUmbrPrice() {
    console.log(`app.getCurrentUmbrPrice()`);
    // return await this.coingecko.getPriceBySymbol("umbr");
    return await this.coingecko.getPriceById("umbra-network");
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route path={"/chartTest/Donut"} exact component={BarChart} />
          <Route path={"/"} exact component={Overview} />
          <Route path={"/network/bridgevolume/"} component={BridgeVolumeAll} />
          <Route path={"/test"} component={Test}></Route>
          <Route path={"/error404"} exact component={Error404} />
          <Redirect to={"/error404"} />
        </Switch>
        {/* <div className="container">
          <UmberPrice price={this.state.umbrPrice} />
          <AllNetworksAllApys data={this.state.allNetworksApys} />
        </div> */}
      </div>
    );
  }
}

export default App;
