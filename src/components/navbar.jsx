import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../UmbriaPretty.webp";
import styles from "./navbar.css";

export default function NavBar() {
  const navLinks = [
    { text: "Overview", route: "/" },
    { text: "Test", route: "/test" },
    { text: "Bridge Volume", route: "/network/bridgevolume/" },
    {
      text: "API",
      href: "https://bridge.umbria.network/docs/docs-page.html#api-calls",
      newWindow: true,
    },
  ];

  const renderNavLinkLi = (navLink) => {
    return (
      <li key={navLink.text + navLink.route} className="nav-item">
        <NavLink className="nav-link" to={navLink.route}>
          {navLink.text}
        </NavLink>
      </li>
    );
  };

  const renderExtNavLinkLi = (navLink) => {
    return (
      <li key={navLink.text + navLink.href} className="nav-item">
        <a
          className="nav-link"
          href={navLink.href}
          target={navLink.newWindow ? "_blank" : ""}
        >
          {navLink.text}
        </a>
      </li>
    );
  };

  return (
    <nav className="navbar navbar-light bg-light navbar-expand sm">
      <Link to="/" className="navbar__navbar-brand navbar-brand">
        <img src={logo} height="30px" alt="Umbria Logo" />
        <span className="">Umbria Bridge</span>
      </Link>
      <ul className="navbar-nav mr-auto">
        {navLinks.map((navLink) =>
          navLink.route ? renderNavLinkLi(navLink) : renderExtNavLinkLi(navLink)
        )}
      </ul>
    </nav>
  );
}
