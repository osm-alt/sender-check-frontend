import React, { Component } from "react";
import SearchBar from "./searchBar";
import SendersTable from "./sendersTable";
import "../App.css";

class TrustedSenders extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <SearchBar placeholder_value="Sender's name" />
        <SendersTable />
      </React.Fragment>
    );
  }
}

export default TrustedSenders;
