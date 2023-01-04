import React, { Component } from "react";
import SearchBar from "./searchBar";

class PermittedUsers extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="col-lg-6 mx-auto title">
          <h1>Permitted Users</h1>
        </div>
        <SearchBar placeholder_value="Username" />
        <table className="table table-hover senders-table">
          <thead>
            <tr>
              <th>Permitted User</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="d-flex justify-content-between align-items-start">
                <span className="mt-1">Omar Majzoub</span>
                <button className="ms-5 btn btn-danger">
                  <i
                    className="bi pe-none bi-trash-fill"
                    width="16"
                    height="16"
                  ></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default PermittedUsers;
