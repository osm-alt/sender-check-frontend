import React, { Component } from "react";

class SendersTable extends Component {
  state = {
    trusted_senders: this.props.retrieved_list,
  };
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
          {this.state.trusted_senders ? (
            Object.keys(this.state.trusted_senders).map((sender_name) => {
              return (
                <tr key={sender_name + "_row"}>
                  <td>{sender_name.replace("(dot)", ".")}</td>
                  <td>
                    <ul className="list-group">
                      {this.state.trusted_senders[sender_name].map(
                        (sender_email) => {
                          return (
                            <li
                              className="list-group-item d-flex justify-content-between align-items-start"
                              key={sender_email}
                            >
                              <span className="mt-1">{sender_email}</span>

                              <button className="btn btn-danger">
                                <i
                                  className="bi pe-none bi-trash-fill"
                                  width="16"
                                  height="16"
                                ></i>
                              </button>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
    );
  }
}

export default SendersTable;
