import React, { Component } from "react";
import SearchBar from "./searchBar";
import DomainList from "./domainList";
import "../App.css";

class UntrustedDomains extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div class="col-lg-6 mx-auto title">
          <h1>Untrusted Domains</h1>
        </div>
        <SearchBar placeholder_value="Email domain name" />
        <DomainList />
      </React.Fragment>
    );
  }
}

export default UntrustedDomains;
