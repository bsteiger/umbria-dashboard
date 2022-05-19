import React from "react";
import { GitHubIcon } from "./icons";
function Footer() {
  return (
    <React.Fragment>
      <div className="b-example-divider"></div>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noreferrer"
              href="https://github.com/bsteiger/umbria-dashboard"
            >
              <span className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                <GitHubIcon />
              </span>
              <span className="text-muted">github.com/bsteiger</span>
            </a>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            {/* Things here will show up on the right side of the footer */}
          </ul>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Footer;
