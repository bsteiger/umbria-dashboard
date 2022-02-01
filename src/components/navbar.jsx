import React, { Component } from "react";
import logo from "../UmbriaPretty.webp";

class NavBar extends Component {
	state = {};
	render() {
		return (
			<nav className="navbar">
				<span className="navbar-brand h1 m-2">
					<img width="30" height="30" src={logo} alt={"umbria logo"} />
					Umbria Dashboard
				</span>
			</nav>
		);
	}
}

export default NavBar;
