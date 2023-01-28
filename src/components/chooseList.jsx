import React, { useEffect } from "react";
import { useState } from "react";

const ChooseList = () => {
  const [listOwners, setListOwners] = useState(null);

  useEffect(() => {
    requestAccessibleLists(setListOwners);
    return;
  }, [setListOwners]);

  return (
    <React.Fragment>
      <div className="col-lg-6 mx-auto title-list-page mb-5">
        <h1>Choose a list</h1>
      </div>
      {/* <SearchBar placeholder_value="Sender's name" /> */}
      <div className="list-group choose-list">
        <button
          type="button"
          className="list-group-item list-group-item-action active"
          aria-current="true"
          data-bs-toggle="list"
        >
          <div className="ms-2 me-auto">My list</div>
        </button>
        {listOwners ? (
          listOwners.map((e) => {
            return (
              <button
                type="button"
                className="list-group-item list-group-item-action"
                aria-current="true"
                data-bs-toggle="list"
                key={e}
              >
                <div className="ms-2 me-auto">{e}</div>
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

  fetch("http://localhost:4000/accessible_lists", requestOptions)
    .then((response) => response.json())
    .then((result) => setListOwners(result))
    .catch((error) => console.log("error", error));
}

export default ChooseList;
