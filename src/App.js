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
import Main from "./components/home";
import BarChart from "./components/chartTest";
import BridgeVolumeAll from "./dashboards/bridgeVolume/bridgeVolumeAll";

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

  constructor() {
    super();
    console.log("App -- Constructed");
  }

  async componentDidMount() {
    // when the app mounts, get the following info from the api(s)
    // Bridges available (or hard code this)
    // Calls to:
    // this.setState({ umbrPrice: await this.getCurrentUmbrPrice() });
    // this.setState({ networks });
    // this.setState({ selectedNetwork: "ethereum" });
    // this.setState({
    //   allNetworksApys: await this.umbriaApi.getAllNetworksApy(),
    //});
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route path={"/chartTest/Donut"} exact component={BarChart} />
          <Route path={"/"} exact component={Main} />
          <Route path={"/network/bridgevolume/"} component={BridgeVolumeAll} />
          {/* <Route path={"/bridge/apys"} exact component={Apys} /> */}
          {/* <Route path={"/bridge"} exact component={Main} /> */}

          {/* <Route path={"/wallet/:address"}  component={} /> */}
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
