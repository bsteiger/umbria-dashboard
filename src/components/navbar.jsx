import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../UmbriaPretty.webp";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div to="/" className="navbar-brand h1 m-2">
          <Link to="/">
            <img width="30" height="30" src={logo} alt={"umbria logo"} />
          </Link>
          Umbria Dashboard
        </div>
      </nav>
    );
  }
}

export default NavBar;
