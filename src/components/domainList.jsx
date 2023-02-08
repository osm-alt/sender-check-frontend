import React, { useEffect } from "react";
import { useState, useMemo } from "react";

const DomainList = (props) => {
  const [trustedDomains, setTrustedDomains] = useState(props.retrieved_list);
  const query = props.query;

  const filteredItems = useMemo(() => {
    if (!trustedDomains) return;
    return trustedDomains.filter((item) => {
      return item.toLowerCase().includes(query.toLowerCase());
    });
  }, [trustedDomains, query]);

  const is_owner =
    localStorage.getItem("sc_list_owner") === localStorage.getItem("sc_email");

  useEffect(() => {
    setTrustedDomains(props.retrieved_list);
    return;
  }, [props.retrieved_list]);

  return (
    <table
      className={"table table-hover senders-table" + (is_owner ? "-owner" : "")}
    >
      <thead>
        <tr>
          <th>Email domain name</th>
        </tr>
      </thead>
      <tbody>
        {filteredItems ? (
          filteredItems.map((domain) => {
            return (
              <tr key={domain + "_row"}>
                <td className="d-flex justify-content-between align-items-start">
                  <span className="mt-1">{domain}</span>
                  {is_owner ? (
                    <button
                      className="ms-5 btn btn-danger"
                      onClick={(e) => {
                        let domainToDelete = e.target.parentNode.textContent;
                        props.deleteDomain(
                          domainToDelete,
                          props.setErrorMessage,
                          props.getDomains,
                          props.setDomains
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

export default DomainList;
