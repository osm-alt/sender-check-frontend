import React, { Component } from "react";

class SendersTable extends Component {
  state = {};
  render() {
    return (
      <table className="table table-hover senders-table">
        <thead>
          <tr>
            <th>Sender name</th>
            <th>Sender email address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Omar Majzoub</td>
            <td>osm@hotmail.com</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default SendersTable;
