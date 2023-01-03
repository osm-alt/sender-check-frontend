import React, { Component } from "react";

class DomainList extends Component {
  state = {};
  render() {
    return (
      <table className="table table-hover senders-table">
        <thead>
          <tr>
            <th>Email domain name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>abc.com</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default DomainList;
