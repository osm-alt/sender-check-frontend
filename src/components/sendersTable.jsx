import React, { useEffect } from "react";
import { useState, useMemo } from "react";

const SendersTable = (props) => {
  const [trustedSenders, setTrustedSenders] = useState(props.retrieved_list);
  const query = props.query;

  const filteredItems = useMemo(() => {
    if (!trustedSenders) return;
    return Object.keys(trustedSenders).filter((item) => {
      return item.toLowerCase().includes(query.toLowerCase());
    });
  }, [trustedSenders, query]);

  const is_owner =
    localStorage.getItem("sc_list_owner") === localStorage.getItem("sc_email");
  useEffect(() => {
    setTrustedSenders(props.retrieved_list);
    return;
  }, [props.retrieved_list]);
  return (
    <table
      className={"table table-hover senders-table" + (is_owner ? "-owner" : "")}
    >
      <thead>
        <tr>
          <th>Sender name</th>
          <th>Sender email address</th>
        </tr>
      </thead>
      <tbody>
        {filteredItems ? (
          filteredItems.map((sender_name) => {
            return (
              <tr key={sender_name + "_row"}>
                <td>{sender_name.replace("(dot)", ".")}</td>
                <td>
                  <ul className="list-group">
                    {trustedSenders[sender_name].map((sender_email) => {
                      return (
                        <li
                          className="list-group-item d-flex justify-content-between align-items-start"
                          key={sender_email}
                        >
                          <span className="mt-1">{sender_email}</span>
                          {is_owner ? (
                            <button
                              className="btn btn-danger ms-2"
                              onClick={(e) => {
                                let senderToDeleteName =
                                  e.target.parentNode.parentNode.parentNode
                                    .parentNode.firstChild.firstChild
                                    .textContent;
                                let senderToDeleteEmail =
                                  e.target.parentNode.firstChild.firstChild
                                    .textContent;
                                props.deleteSender(
                                  senderToDeleteName,
                                  senderToDeleteEmail,
                                  props.setErrorMessage,
                                  props.getSenders,
                                  props.setSenders
                                );
                              }}
                            >
                              <i
                                className="bi pe-none bi-trash-fill"
                                width="16"
                                height="16"
                              ></i>
                            </button>
                          ) : (
                            <></>
                          )}
                        </li>
                      );
                    })}
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
};

export default SendersTable;
