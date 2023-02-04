import React from "react";
import SearchBar from "./searchBar";
import SendersTable from "./sendersTable";
import "../App.css";
import requestNewToken from "../requestNewToken";
import { useState, useEffect } from "react";

const TrustedSenders = () => {
  const [trustedSenders, setTrustedSenders] = useState(null);

  useEffect(() => {
    getTrustedSenders(setTrustedSenders);
    return;
  }, [setTrustedSenders]);

  return (
    <React.Fragment>
      <div className="col-lg-6 mx-auto title">
        <h1>Trusted Senders</h1>
      </div>
      <SearchBar placeholder_value="Sender's name" />
      {trustedSenders ? (
        <SendersTable retrieved_list={trustedSenders} />
      ) : (
        <p className="senders-table text-center mt-3">
          No senders retrieved yet
        </p>
      )}
    </React.Fragment>
  );
};

function getTrustedSenders(setTrustedSenders) {
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
          setTrustedSenders(result.message);
        } else {
          setTrustedSenders(result);
        }
      }
    })
    .catch((error) => console.log("error", error));

  if (expired) {
    getTrustedSenders();
  }
}

export default TrustedSenders;
