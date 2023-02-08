import React from "react";
import SearchBar from "./searchBar";
import SendersTable from "./sendersTable";
import "../App.css";
import requestNewToken from "../requestNewToken";
import { useState, useEffect } from "react";

const UntrustedSenders = () => {
  const [untrustedSenders, setUntrustedSenders] = useState(null);
  const [senderToAddName, setSenderToAddName] = useState(null);
  const [senderToAddEmail, setSenderToAddEmail] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getUntrustedSenders(setUntrustedSenders);
    return;
  }, [setUntrustedSenders]);

  return (
    <React.Fragment>
      <div className="col-lg-6 mx-auto title">
        <h1>Untrusted Senders</h1>
      </div>
      <SearchBar
        placeholder_value="Search by sender's name"
        query={query}
        setQuery={setQuery}
      />
      {localStorage.getItem("sc_list_owner").toString() ===
      localStorage.getItem("sc_email") ? (
        <div className="add-item">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Sender's name"
              aria-label="Sender's name"
              onChange={(e) => {
                setSenderToAddName(e.target.value);
              }}
            />
            <input
              type="email"
              className="form-control"
              placeholder="Sender's email address"
              aria-label="Sender's email address"
              onChange={(e) => {
                setSenderToAddEmail(e.target.value);
              }}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={() => {
                addUntrustedSender(
                  senderToAddName,
                  senderToAddEmail,
                  setErrorMessage,
                  getUntrustedSenders,
                  setUntrustedSenders
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

      {untrustedSenders ? (
        <SendersTable
          retrieved_list={untrustedSenders}
          setSenders={setUntrustedSenders}
          setErrorMessage={setErrorMessage}
          getSenders={getUntrustedSenders}
          deleteSender={deleteUntrustedSender}
          query={query}
        />
      ) : (
        <p className="senders-table text-center mt-3">
          No senders retrieved yet
        </p>
      )}
    </React.Fragment>
  );
};

async function getUntrustedSenders(setUntrustedSenders) {
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
    "http://localhost:4000/untrusted_senders?list_owner=" +
      localStorage.getItem("sc_list_owner"),
    requestOptions
  )
    .then((response) => {
      if (response.status === 500) {
        console.clear();
        return null;
      } else if (response.status === 403) {
        requestNewToken(getUntrustedSenders, [setUntrustedSenders]);
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
}

async function addUntrustedSender(
  senderToAddName,
  senderToAddEmail,
  setErrorMessage,
  getUntrustedSenders,
  setUntrustedSenders
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
    sender_name: senderToAddName,
    sender_email: senderToAddEmail,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("http://localhost:4000/untrusted_senders", requestOptions)
    .then((response) => {
      add_button.disabled = false;

      if (response.status === 500) {
        console.clear();
        return null;
      } else if (response.status === 403) {
        requestNewToken(addUntrustedSender, [
          senderToAddName,
          senderToAddEmail,
          setErrorMessage,
          getUntrustedSenders,
          setUntrustedSenders,
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
            result.details[0].message
              .replace(/"sender_name"/, "Sender's name")
              .replace(/"sender_email"/, "Sender's email address")
          );
        } else if (result.message) {
          setErrorMessage(result.message);
        } else {
          setErrorMessage("Successfully added");
          getUntrustedSenders(setUntrustedSenders);
        }
      }
    })
    .catch((error) => console.log("error", error));
}

async function deleteUntrustedSender(
  senderToDeleteName,
  senderToDeleteEmail,
  setErrorMessage,
  getUntrustedSenders,
  setUntrustedSenders
) {
  let delete_button = document.getElementById("button-addon2");
  delete_button.disabled = true;
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem("sc_acc_token")
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    sender_name: senderToDeleteName,
    sender_email: senderToDeleteEmail,
  });

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("http://localhost:4000/untrusted_senders", requestOptions)
    .then((response) => {
      delete_button.disabled = false;

      if (response.status === 500) {
        console.clear();
        return null;
      } else if (response.status === 403) {
        requestNewToken(deleteUntrustedSender, [
          senderToDeleteName,
          senderToDeleteEmail,
          setErrorMessage,
          getUntrustedSenders,
          setUntrustedSenders,
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
            result.details[0].message
              .replace(/"sender_name"/, "Sender's name")
              .replace(/"sender_email"/, "Sender's email address")
          );
        } else {
          setErrorMessage("Successfully deleted");
          getUntrustedSenders(setUntrustedSenders);
        }
      }
    })
    .catch((error) => console.log("error", error));
}

export default UntrustedSenders;
