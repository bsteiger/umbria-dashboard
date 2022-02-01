import React, { Component } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import UmberPrice from "./components/umbrprice.jsx";
import NavBar from "./components/navbar.jsx";
import networks from "./logic/networks";
import UmbriaApi from "./logic/umbr";
import AllNetworksAllApys from "./components/allNetworksAllApys";
import CoinGecko from "./logic/coingecko";
import { dateToEpochTime, getDateMinus } from "./logic/utils";

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
		return await this.coingecko.getPriceBySymbol("umbr");
	}

	constructor() {
		super();
		console.log("App -- Constructed");
	}

	async componentDidMount() {
		// when the app mounts, get the following info from the api(s)
		// Bridges available (or hard code this)
		// Calls to:

		this.setState({ umbrPrice: await this.getCurrentUmbrPrice() });
		this.setState({ networks });
		this.setState({ selectedNetwork: "ethereum" });

		await this.umbriaApi.getAPYAllBridgeRoutes("ethereum");
		await this.umbriaApi.getAvgBridgeVolumesAllNetworks(
			dateToEpochTime(getDateMinus({ days: 7 }))
		);

		this.setState({
			allNetworksApys: await this.umbriaApi.getAllNetworksApy(),
		});
	}

	render() {
		return (
			<div className="App">
				<NavBar />
				<div className="container">
					<UmberPrice price={this.state.umbrPrice} />
					<AllNetworksAllApys data={this.state.allNetworksApys} />
				</div>
			</div>
		);
	}
}

export default App;
