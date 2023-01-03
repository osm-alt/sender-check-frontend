import React, { Component } from "react";
import SearchBar from "./searchBar";
import SendersTable from "./sendersTable";
import "../App.css";

class TrustedSenders extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <SearchBar />
        <SendersTable />
      </React.Fragment>
    );
  }
}

export default TrustedSenders;
