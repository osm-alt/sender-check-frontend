import React from "react";
import SearchBar from "./searchBar";
import { useState, useEffect } from "react";
import requestNewToken from "../requestNewToken";

const PermittedUsers = () => {
  const [permittedUsers, setPermittedUsers] = useState(null);
  const [userToAdd, setUserToAdd] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getPermittedUsers(setPermittedUsers);
    return;
  }, [setPermittedUsers]);

  return (
    <React.Fragment>
      <div className="col-lg-6 mx-auto title">
        <h2>My List's Permitted Users</h2>
      </div>
      <SearchBar placeholder_value="User's email" />
      <div className="add-item">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="User's email"
            aria-label="User's email"
            onChange={(e) => {
              setUserToAdd(e.target.value);
            }}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={() => {
              addPermittedUser(
                userToAdd,
                setErrorMessage,
                getPermittedUsers,
                setPermittedUsers
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
      <table className="table table-hover senders-table-owner">
        <thead>
          <tr>
            <th>Permitted User</th>
          </tr>
        </thead>
        <tbody>
          {permittedUsers ? (
            permittedUsers.map((permitted_user) => {
              return (
                <tr key={permitted_user + "_row"}>
                  <td className="d-flex justify-content-between align-items-start">
                    <span className="mt-1">{permitted_user}</span>
                    <button className="ms-5 btn btn-danger">
                      <i
                        className="bi pe-none bi-trash-fill"
                        width="16"
                        height="16"
                      ></i>
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
};

async function getPermittedUsers(setPermittedUsers) {
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

  fetch("http://localhost:4000/users_with_access", requestOptions)
    .then((response) => {
      if (response.status === 500) {
        console.clear();
        return null;
      } else if (response.status === 403) {
        requestNewToken(getPermittedUsers, [setPermittedUsers]);
      } else if (response.ok) {
        return response.json();
      }
      return null;
    })
    .then((result) => {
      if (result) {
        if (result.message) {
          setPermittedUsers(result.message);
        } else {
          setPermittedUsers(result);
        }
      }
    })
    .catch((error) => console.log("error", error));
}

async function addPermittedUser(
  userToAdd,
  setErrorMessage,
  getPermittedUsers,
  setPermittedUsers
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
    user_email: userToAdd,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("http://localhost:4000/users_with_access", requestOptions)
    .then((response) => {
      add_button.disabled = false;

      if (response.status === 500) {
        console.clear();
        return null;
      } else if (response.status === 403) {
        requestNewToken(addPermittedUser, [
          userToAdd,
          setErrorMessage,
          getPermittedUsers,
          setPermittedUsers,
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
            result.details[0].message.replace(/"user_email"/, "User email")
          );
        } else if (result.message) {
          setErrorMessage(result.message);
        } else {
          setErrorMessage("Successfully added");
          getPermittedUsers(setPermittedUsers);
        }
      }
    })
    .catch((error) => console.log("error", error));
}

export default PermittedUsers;
