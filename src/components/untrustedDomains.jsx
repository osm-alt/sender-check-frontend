import React from "react";
import SearchBar from "./searchBar";
import DomainList from "./domainList";
import "../App.css";
import requestNewToken from "../requestNewToken";
import { useState, useEffect } from "react";

const UntrustedDomains = () => {
  const [untrustedDomains, setUntrustedDomains] = useState(null);

  useEffect(() => {
    getUntrustedDomains(setUntrustedDomains);
    return;
  }, [setUntrustedDomains]);

  return (
    <React.Fragment>
      <div className="col-lg-6 mx-auto title">
        <h1>Untrusted Domains</h1>
      </div>
      <SearchBar placeholder_value="Email domain name" />
      {untrustedDomains ? (
        <DomainList retrieved_list={untrustedDomains} />
      ) : (
        <p className="senders-table text-center mt-3">
          No domains retrieved yet
        </p>
      )}
    </React.Fragment>
  );
};

function getUntrustedDomains(setUntrustedDomains) {
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

  fetch(
    "http://localhost:4000/untrusted_domains?list_owner=" +
      localStorage.getItem("sc_list_owner"),
    requestOptions
  )
    .then((response) => {
      if (response.status === 500) {
        console.clear();
        return null;
      } else if (response.status === 403) {
        requestNewToken(getUntrustedDomains, setUntrustedDomains);
      } else if (response.ok) {
        return response.json();
      }
      return null;
    })
    .then((result) => {
      if (result) {
        if (result.message) {
          setUntrustedDomains(result.message);
        } else {
          setUntrustedDomains(result);
        }
      }
    })
    .catch((error) => console.log("error", error));
}

export default UntrustedDomains;
