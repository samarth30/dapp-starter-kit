import React from "react";

const Navbar = ({ account }) => {
  return (
    <nav className="navbar navbar-dark bg-dark shadow mb-5">
      <p className="navbar-brand my-auto">
        <div className="row" style={{ paddingLeft: "10px" }}>
          <div>
            <a href="/" style={{ color: "#ffffff" }}>
              {" "}
              react website
            </a>
          </div>
          <div style={{ paddingLeft: "10px" }}>
            <a href="/admin" style={{ color: "#ffffff" }}>
              {" "}
              admin page
            </a>
          </div>
        </div>
      </p>
      <ul className="navbar-nav">
        <li className="nav-item text-white">{account}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
