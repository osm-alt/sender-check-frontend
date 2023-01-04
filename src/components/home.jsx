import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="home">
        <div className="px-4 py-5 my-5 text-center">
          <img
            className="d-block mx-auto mb-4"
            src="/docs/5.3/assets/brand/bootstrap-logo.svg"
            alt=""
            width="72"
            height="57"
          />
          <h1 className="display-5 fw-bold mb-4">SenderCheck</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              SenderCheck helps you protect yourself from email fraudsters as
              you view your emails on Chrome using Outlook, Gmail, or Yahoo
              Mail.
            </p>
            <p className="lead mb-4">
              You can also give others read-only access to your trusted and
              untrusted senders and domains lists.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
