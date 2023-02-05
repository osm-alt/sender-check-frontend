import React from "react";
import SearchBar from "./searchBar";
import DomainList from "./domainList";
import "../App.css";
import requestNewToken from "../requestNewToken";
import { useState, useEffect } from "react";

const TrustedDomains = () => {
  const [trustedDomains, setTrustedDomains] = useState(null);

  useEffect(() => {
    getTrustedDomains(setTrustedDomains);
    return;
  }, [setTrustedDomains]);

  return (
    <React.Fragment>
      <div className="col-lg-6 mx-auto title">
        <h1>Trusted Domains</h1>
      </div>
      <SearchBar placeholder_value="Email domain name" />
      {trustedDomains ? (
        <DomainList retrieved_list={trustedDomains} />
      ) : (
        <p className="senders-table text-center mt-3">
          No domains retrieved yet
        </p>
      )}
    </React.Fragment>
  );
};

function getTrustedDomains(setTrustedDomains) {
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
    "http://localhost:4000/trusted_domains?list_owner=" +
      localStorage.getItem("sc_list_owner"),
    requestOptions
  )
    .then((response) => {
      if (response.status === 500) {
        console.clear();
        return null;
      } else if (response.status === 403) {
        requestNewToken(getTrustedDomains, setTrustedDomains);
      } else if (response.ok) {
        return response.json();
      }
      return null;
    })
    .then((result) => {
      if (result) {
        if (result.message) {
          setTrustedDomains(result.message);
        } else {
          setTrustedDomains(result);
        }
      }
    })
    .catch((error) => console.log("error", error));
}

export default TrustedDomains;
