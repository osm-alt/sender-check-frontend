import React, { Component } from "react";
import SearchBar from "./searchBar";
import SendersTable from "./sendersTable";
import "../App.css";

class UntrustedSenders extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="col-lg-6 mx-auto title">
          <h1>Untrusted Senders</h1>
        </div>
        <SearchBar placeholder_value="Sender's name" />
        <SendersTable />
      </React.Fragment>
    );
  }
}

export default UntrustedSenders;
