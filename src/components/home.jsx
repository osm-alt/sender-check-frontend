import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="home">
        <img
          className="d-block mx-auto"
          src={require("../assets/SenderCheck-logos/SenderCheck-logos_black_crop.png")}
          alt=""
          width="40%"
        />
        <div className="px-4  text-center">
          {/* <h1 className="fw-bold mb-4">SenderCheck</h1> */}
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              SenderCheck helps you protect yourself from email fraudsters as
              you view your emails on Chrome using Outlook or Gmail.
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
