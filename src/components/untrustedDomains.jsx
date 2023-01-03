import React, { Component } from "react";
import SearchBar from "./searchBar";
import DomainList from "./domainList";
import "../App.css";

class UntrustedDomains extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <SearchBar placeholder_value="Email domain name" />
        <DomainList />
      </React.Fragment>
    );
  }
}

export default UntrustedDomains;
