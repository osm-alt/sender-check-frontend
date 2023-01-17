import React, { Component } from "react";

class Login extends Component {
  state = {};
  render() {
    return (
      <div className="login">
        <form>
          <img className="mb-4" src="" alt="" />
          <h1 className="h3 mb-5 fw-normal">Login</h1>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-5 flex-grow:5">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="btn btn-lg btn-primary mb-3" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
