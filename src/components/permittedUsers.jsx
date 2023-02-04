import React from "react";
import SearchBar from "./searchBar";
import { useState, useEffect } from "react";
import requestNewToken from "../requestNewToken";

const PermittedUsers = () => {
  const [permittedUsers, setPermittedUsers] = useState(null);

  useEffect(() => {
    getPermittedUsers(setPermittedUsers);
    return;
  }, [setPermittedUsers]);

  return (
    <React.Fragment>
      <div className="col-lg-6 mx-auto title">
        <h1>My List's Permitted Users</h1>
      </div>
      <SearchBar placeholder_value="Username" />
      <table className="table table-hover senders-table">
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

function getPermittedUsers(setPermittedUsers) {
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

  fetch("http://localhost:4000/users_with_access", requestOptions)
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
          setPermittedUsers(result.message);
        } else {
          setPermittedUsers(result);
        }
      }
    })
    .catch((error) => console.log("error", error));

  if (expired) {
    getPermittedUsers();
  }
}

export default PermittedUsers;
