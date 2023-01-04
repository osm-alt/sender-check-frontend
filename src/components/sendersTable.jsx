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
            <td>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <span className="mt-1">osm@hotmail.com</span>

                  <button className="btn btn-danger">
                    <i
                      className="bi pe-none bi-trash-fill"
                      width="16"
                      height="16"
                    ></i>
                  </button>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <span className="mt-1">osm@hotmail.com</span>

                  <button className="btn btn-danger">
                    <i
                      className="bi pe-none bi-trash-fill"
                      width="16"
                      height="16"
                    ></i>
                  </button>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default SendersTable;
