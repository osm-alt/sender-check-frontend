import React, { useState } from "react";
import { useNavigate, Navigate, NavLink } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("sc_authenticated");

  if (loggedInUser) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="login">
      <form
        onSubmit={(e) => {
          sendCredentials(e, setErrorMessage, navigate);
        }}
      >
        <img className="mb-4" src="" alt="" />
        <h1 className="h3 mb-5 fw-normal">Login</h1>
        <div className="mb-4 text-danger">{errorMessage}</div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="user_email"
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-4 flex-grow:5">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            minLength={5}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="mb-5">
          New user? <NavLink to="../sign_up">Create an account</NavLink>
        </div>
        <button type="submit" className="btn btn-lg btn-primary mb-3">
          Sign in
        </button>
      </form>
    </div>
  );
};

function sendCredentials(event, setErrorMessage, navigate) {
  event.preventDefault();

  let form = document.querySelector("form");

  //make a JS object from the form inputs to send them as JSON later
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const button = document.querySelector("button");

  button.disabled = true;

  var raw = JSON.stringify(data);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:4000/users/login", requestOptions)
    .then((response) => {
      button.disabled = false;

      return response.json();
    })
    .then((result) => {
      if (result.details) {
        setErrorMessage(
          result.details[0].message
            .replace(/"user_email"/, "Email address")
            .replace(/"password"/, "Password")
        );
      } else if (result.message) {
        setErrorMessage(result.message);
      } else if (
        result.access_token &&
        result.refresh_token &&
        result.user_name
      ) {
        localStorage.setItem("sc_user", result.user_name);
        localStorage.setItem("sc_email", result.user_email);
        localStorage.setItem("sc_list_owner", result.user_email); //user requests their own lists by default
        localStorage.setItem("sc_acc_token", result.access_token);
        localStorage.setItem("sc_ref_token", result.refresh_token);
        localStorage.setItem("sc_authenticated", true);
        navigate("/");
      }
    })
    .catch((error) => console.log("error", error));
}

export default Login;
