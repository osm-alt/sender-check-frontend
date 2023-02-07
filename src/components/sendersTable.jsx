import React, { useEffect } from "react";
import { useState } from "react";

const SendersTable = (props) => {
  const [trustedSenders, setTrustedSenders] = useState(props.retrieved_list);

  useEffect(() => {
    setTrustedSenders(props.retrieved_list);
    return;
  }, [props.retrieved_list]);
  return (
    <table
      className={
        "table table-hover senders-table" +
        (localStorage.getItem("sc_list_owner").toString() ===
        localStorage.getItem("sc_email")
          ? "-owner"
          : "")
      }
    >
      <thead>
        <tr>
          <th>Sender name</th>
          <th>Sender email address</th>
        </tr>
      </thead>
      <tbody>
        {trustedSenders ? (
          Object.keys(trustedSenders).map((sender_name) => {
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

                          <button className="btn btn-danger ms-2">
                            <i
                              className="bi pe-none bi-trash-fill"
                              width="16"
                              height="16"
                            ></i>
                          </button>
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
