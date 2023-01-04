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
            <td className="d-flex justify-content-between align-items-start">
              <span className="mt-1">abc.com</span>
              <button className="ms-5 btn btn-danger">
                <i
                  className="bi pe-none bi-trash-fill"
                  width="16"
                  height="16"
                ></i>
              </button>
            </td>
          </tr>
          <tr>
            <td className="d-flex justify-content-between align-items-start">
              <span className="mt-1">abc.com</span>
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
    );
  }
}

export default DomainList;
