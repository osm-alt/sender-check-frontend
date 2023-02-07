import React from "react";
import SearchBar from "./searchBar";
import DomainList from "./domainList";
import "../App.css";
import requestNewToken from "../requestNewToken";
import { useState, useEffect } from "react";

const UntrustedDomains = () => {
  const [untrustedDomains, setUntrustedDomains] = useState(null);
  const [domainToAdd, setDomainToAdd] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
                addUntrustedDomain(
                  domainToAdd,
                  setErrorMessage,
                  getUntrustedDomains,
                  setUntrustedDomains
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

async function getUntrustedDomains(setUntrustedDomains) {
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
        requestNewToken(getUntrustedDomains, [setUntrustedDomains]);
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

async function addUntrustedDomain(
  domainToAdd,
  setErrorMessage,
  getUntrustedDomains,
  setUntrustedDomains
) {
  let add_button = document.getElementById("button-addon2");
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

  await fetch("http://localhost:4000/untrusted_domains", requestOptions)
    .then((response) => {
      add_button.disabled = false;

      if (response.status === 500) {
        console.clear();
        return null;
      } else if (response.status === 403) {
        requestNewToken(addUntrustedDomain, [
          domainToAdd,
          setErrorMessage,
          getUntrustedDomains,
          setUntrustedDomains,
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
          getUntrustedDomains(setUntrustedDomains);
        }
      }
    })
    .catch((error) => console.log("error", error));
}

export default UntrustedDomains;
