import React, { Component } from "react";

class DomainList extends Component {
  state = {
    trusted_domains: this.props.retrieved_list,
  };
  render() {
    return (
      <table className="table table-hover senders-table">
        <thead>
          <tr>
            <th>Email domain name</th>
          </tr>
        </thead>
        <tbody>
          {this.state.trusted_domains ? (
            this.state.trusted_domains.map((domain) => {
              return (
                <tr key={domain + "_row"}>
                  <td className="d-flex justify-content-between align-items-start">
                    <span className="mt-1">{domain}</span>
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
    );
  }
}

export default DomainList;
