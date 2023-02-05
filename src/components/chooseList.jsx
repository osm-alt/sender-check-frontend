import React, { useEffect } from "react";
import { useState } from "react";
import requestNewToken from "../requestNewToken";

const ChooseList = () => {
  const [listOwners, setListOwners] = useState(null);

  const choose_list_owner = (key) => {
    if (key) {
      localStorage.setItem("sc_list_owner", key);
    } else {
      localStorage.setItem(
        "sc_list_owner",
        localStorage.getItem("sc_email").toString()
      );
    }
  };
  useEffect(() => {
    requestAccessibleLists(setListOwners);
    return;
  }, [setListOwners]);

  return (
    <React.Fragment>
      <div className="col-lg-6 mx-auto title-list-page mb-4">
        <h1>Choose a list</h1>
      </div>
      {/* <SearchBar placeholder_value="Sender's name" /> */}
      <div className="list-group choose-list">
        <button
          type="button"
          className={
            "list-group-item list-group-item-action " +
            (localStorage.getItem("sc_list_owner").toString() ===
            localStorage.getItem("sc_email").toString()
              ? "active"
              : "")
          }
          aria-current="true"
          data-bs-toggle="list"
          onClick={() => {
            choose_list_owner(null);
          }}
        >
          <div
            className="ms-2 me-auto"
            onClick={() => {
              choose_list_owner(null);
            }}
          >
            My list
          </div>
        </button>
        {listOwners ? (
          listOwners.map((e) => {
            return (
              <button
                type="button"
                className={
                  "list-group-item list-group-item-action " +
                  (localStorage.getItem("sc_list_owner").toString() === e
                    ? "active"
                    : "")
                }
                aria-current="true"
                data-bs-toggle="list"
                key={e}
                id={e}
                onClick={(e) => {
                  choose_list_owner(e.currentTarget.id);
                }}
              >
                <div
                  className="ms-2 me-auto"
                  onClick={(e) => {
                    choose_list_owner(e.target.parentNode.id);
                  }}
                >
                  {e}'s list
                </div>
              </button>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </React.Fragment>
  );
};

function requestAccessibleLists(setListOwners) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem("sc_acc_token")
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let expired = false;

  fetch("http://localhost:4000/accessible_lists", requestOptions)
    .then((response) => {
      if (response.status === 404) {
        console.clear();
        return null;
      } else if (response.status === 403) {
        requestNewToken();
        expired = true;
      } else {
        return response.json();
      }
    })
    .then((result) => {
      if (result) {
        setListOwners(result);
      }
    })
    .catch((error) => console.log("error", error));

  if (expired) {
    requestAccessibleLists();
  }
}

export default ChooseList;
