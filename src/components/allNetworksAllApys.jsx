import React, { Component } from "react";
import NETWORKS, { BRIDGEDISPLAYNAMES } from "../logic/networks";

class AllNetworksAllApys extends Component {
	state = {};
	render() {
		const { data } = this.props;
		if (!data) return null;
		return (
			<div className="row mt-2">
				{NETWORKS.map((network) => {
					// console.log(data);
					return (
						<BridgeApyCard
							key={network.apiName}
							network={network.displayName}
							bridgeData={data.filter((d) => d.network === network.displayName)}
						/>
					);
				})}
			</div>
		);
	}
}

const BridgeApyCard = (props) => {
	const { bridgeData, network } = props;

	return (
		<div className="col">
			<div className="card">
				<h6 className="card-body">{network}</h6>
				{bridgeData.map((pool) => {
					return (
						<div key={pool.asset + pool.bridge}>
							<span>{pool.asset}</span>
							<div style={{ fontSize: ".75rem" }}>
								{pool.bridge ? `${BRIDGEDISPLAYNAMES[pool.bridge]}` : ""}
							</div>
							<pre>{(pool.apy * 100).toFixed(1)}%</pre>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AllNetworksAllApys;
