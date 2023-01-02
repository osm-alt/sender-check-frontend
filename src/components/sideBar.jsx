import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

class SideBar extends Component {
  state = {};
  render() {
    return (
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar"
        style={{ width: 280 + "px", height: 100 + "vh" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <span className="fs-4">SenderCheck</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              <i
                className="bi pe-none me-2 bi-house"
                width="16"
                height="16"
              ></i>
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark">
              <i
                className="bi pe-none me-2 bi-check2-circle"
                width="16"
                height="16"
              ></i>
              Trusted Senders
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark">
              {/* <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#table"></use>
              </svg> */}
              Orders
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark">
              {/* <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#grid"></use>
              </svg> */}
              Products
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark">
              {/* <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#people-circle"></use>
              </svg> */}
              Customers
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
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
            <strong>mdo</strong>
          </a>
          <ul className="dropdown-menu text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

// const routes = (
//   <BrowserRouter>
//     <Switch></Switch>
//   </BrowserRouter>
// );

export default SideBar;
