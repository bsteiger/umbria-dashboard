import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../UmbriaPretty.webp";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top">
        <div className="container-fluid">
          <div to="/" className="navbar-brand h1 m-2">
            <Link to="/">
              <img width="30" height="30" src={logo} alt={"umbria logo"} />
            </Link>
            Umbria Dashboard
          </div>
          <div>
            <a
              target={"_blank"}
              href="https://bridge.umbria.network/docs/docs-page.html#api-calls"
            >
              API Documentation
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
