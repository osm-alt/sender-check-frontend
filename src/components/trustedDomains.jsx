import React from "react";
import SearchBar from "./searchBar";
import DomainList from "./domainList";
import "../App.css";
import requestNewToken from "../requestNewToken";
import { useState, useEffect } from "react";

const TrustedDomains = () => {
  const [trustedDomains, setTrustedDomains] = useState(null);
  const [domainToAdd, setDomainToAdd] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      {localStorage.getItem("sc_list_owner").toString() ===
      localStorage.getItem("sc_email") ? (
        <div className="add-item">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Domain name"
              aria-label="Domain name"
              onChange={(e) => {
                setDomainToAdd(e.target.value);
              }}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={() => {
                addTrustedDomain(
                  domainToAdd,
                  setErrorMessage,
                  getTrustedDomains,
                  setTrustedDomains
                );
              }}
            >
              Add
            </button>
          </div>
          <div
            id="errorMessage"
            className={
              "mb-4 text-" +
              (errorMessage === "Successfully added" ? "success" : "danger")
            }
          >
            {errorMessage}
          </div>
        </div>
      ) : (
        <></>
      )}
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

async function getTrustedDomains(setTrustedDomains) {
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
        requestNewToken(getTrustedDomains, [setTrustedDomains]);
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

async function addTrustedDomain(
  domainToAdd,
  setErrorMessage,
  getTrustedDomains,
  setTrustedDomains
) {
  let add_button = document.getElementById("errorMessage");
  add_button.disabled = true;
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem("sc_acc_token")
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    domain: domainToAdd,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("http://localhost:4000/trusted_domains", requestOptions)
    .then((response) => {
      if (response.status === 500) {
        console.clear();
        return null;
      } else if (response.status === 403) {
        requestNewToken(addTrustedDomain, [
          domainToAdd,
          setErrorMessage,
          getTrustedDomains,
          setTrustedDomains,
        ]);
      } else if (response.ok) {
        return response;
      } else if (response.status === 406) {
        return response.json();
      }
      return null;
    })
    .then((result) => {
      if (result) {
        if (result.details) {
          setErrorMessage(
            result.details[0].message.replace(/"domain"/, "Domain")
          );
        } else if (result.message) {
          setErrorMessage(result.message);
        } else {
          setErrorMessage("Successfully added");
          getTrustedDomains(setTrustedDomains);
        }
      }
    })
    .catch((error) => console.log("error", error));

  add_button.disabled = false;
}

export default TrustedDomains;
