import React from "react";
import SearchBar from "./searchBar";
import SendersTable from "./sendersTable";
import "../App.css";
import requestNewToken from "../requestNewToken";
import { useState, useEffect } from "react";

const UntrustedSenders = () => {
  const [untrustedSenders, setUntrustedSenders] = useState(null);

  useEffect(() => {
    getUntrustedSenders(setUntrustedSenders);
    return;
  }, [setUntrustedSenders]);

  return (
    <React.Fragment>
      <div className="col-lg-6 mx-auto title">
        <h1>Untrusted Senders</h1>
      </div>
      <SearchBar placeholder_value="Sender's name" />
      {untrustedSenders ? (
        <SendersTable retrieved_list={untrustedSenders} />
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

function getUntrustedSenders(setUntrustedSenders) {
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
    "http://localhost:4000/untrusted_senders?list_owner=" +
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
          setUntrustedSenders(result.message);
        } else {
          setUntrustedSenders(result);
        }
      }
    })
    .catch((error) => console.log("error", error));

  if (expired) {
    getUntrustedSenders();
  }
}

export default UntrustedSenders;
