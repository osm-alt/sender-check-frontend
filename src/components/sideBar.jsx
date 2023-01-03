import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class SideBar extends Component {
  state = {};
  render() {
    return (
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar"
        style={{ width: 280 + "px", height: 100 + "vh" }}
      >
        <NavLink
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <span className="fs-4">SenderCheck</span>
        </NavLink>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isActive
                  ? "active nav-link"
                  : isPending
                  ? "pending nav-link"
                  : "nav-link link-dark"
              }
            >
              <i
                className="bi pe-none me-2 bi-house"
                width="16"
                height="16"
              ></i>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="trusted_senders"
              className={({ isActive, isPending }) =>
                isActive
                  ? "active nav-link"
                  : isPending
                  ? "pending nav-link"
                  : "nav-link link-dark"
              }
            >
              <i
                className="bi pe-none me-2 bi-person-check"
                width="16"
                height="16"
              ></i>
              Trusted Senders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="untrusted_senders"
              className={({ isActive, isPending }) =>
                isActive
                  ? "active nav-link"
                  : isPending
                  ? "pending nav-link"
                  : "nav-link link-dark"
              }
            >
              <i
                className="bi pe-none me-2 bi-person-exclamation"
                width="16"
                height="16"
              ></i>
              Untrusted Senders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="trusted_domains"
              className={({ isActive, isPending }) =>
                isActive
                  ? "active nav-link"
                  : isPending
                  ? "pending nav-link"
                  : "nav-link link-dark"
              }
            >
              <i
                className="bi pe-none me-2 bi-envelope-check"
                width="16"
                height="16"
              ></i>
              Trusted Domains
            </NavLink>
          </li>
          <li>
            <NavLink
              to="untrusted_domains"
              className={({ isActive, isPending }) =>
                isActive
                  ? "active nav-link"
                  : isPending
                  ? "pending nav-link"
                  : "nav-link link-dark"
              }
            >
              <i
                className="bi pe-none me-2 bi-envelope-exclamation"
                width="16"
                height="16"
              ></i>
              Untrusted Domains
            </NavLink>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <NavLink
            to="#"
            className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>Username</strong>
          </NavLink>
          <ul className="dropdown-menu text-small shadow">
            <li>
              <NavLink className="dropdown-item" to="settings">
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="profile">
                Profile
              </NavLink>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <NavLink className="dropdown-item" to="sign_out">
                Sign out
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SideBar;
