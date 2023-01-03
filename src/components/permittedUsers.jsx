import React, { Component } from "react";
import SearchBar from "./searchBar";

class PermittedUsers extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <SearchBar placeholder_value="Username" />
        <table className="table table-hover senders-table">
          <thead>
            <tr>
              <th>Permitted User</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Omar Majzoub</td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default PermittedUsers;
