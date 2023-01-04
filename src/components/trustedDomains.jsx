import React, { Component } from "react";
import SearchBar from "./searchBar";
import DomainList from "./domainList";
import "../App.css";

class TrustedDomains extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="col-lg-6 mx-auto title">
          <h1>Trusted Domains</h1>
        </div>
        <SearchBar placeholder_value="Email domain name" />
        <DomainList />
      </React.Fragment>
    );
  }
}

export default TrustedDomains;
