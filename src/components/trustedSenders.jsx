import React, { Component } from "react";
import SearchBar from "./searchBar";
import SendersTable from "./sendersTable";
import "../App.css";
import requestNewToken from "../requestNewToken";

class TrustedSenders extends Component {
  state = {};
  render() {
    getTrustedSenders();
    return (
      <React.Fragment>
        <div className="col-lg-6 mx-auto title">
          <h1>Trusted Senders</h1>
        </div>
        <SearchBar placeholder_value="Sender's name" />
        <SendersTable />
      </React.Fragment>
    );
  }
}

function getTrustedSenders() {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem("sc_acc_token")
  );
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let expired = false;

  fetch(
    "http://localhost:4000/trusted_senders?list_owner=" +
      localStorage.getItem("sc_list_owner"),
    requestOptions
  )
    .then((response) => {
      if (response.status === 500) {
        console.clear();
        return null;
      } else if (response.status === 403) {
        requestNewToken();
        expired = true;
      } else if (response.ok) {
        return response.json();
      }
      return null;
    })
    .then((result) => {
      if (result) {
        if (result.message) {
          console.log(result.message);
        } else {
          console.log(result);
        }
      }
    })
    .catch((error) => console.log("error", error));

  if (expired) {
    getTrustedSenders();
  }
}

export default TrustedSenders;
