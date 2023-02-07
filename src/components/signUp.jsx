import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("sc_authenticated");

  if (loggedInUser) {
    return <Navigate replace to="/sign_out" />;
  }

  return (
    <div className="login">
      <form
        onSubmit={(e) => {
          sendCredentials(e, setErrorMessage, navigate);
        }}
      >
        <img className="mb-4" src="" alt="" />
        <h1 className="h3 mb-5 fw-normal">Sign Up</h1>
        <div className="mb-4 text-danger">{errorMessage}</div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput-fname"
            placeholder="John"
            name="first_name"
            required
          />
          <label htmlFor="floatingInput">First name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput-lname"
            placeholder="Doe"
            name="last_name"
            required
          />
          <label htmlFor="floatingInput">Last name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput-email"
            placeholder="name@example.com"
            name="user_email"
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3 flex-grow:5">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            minLength={5}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-5 flex-grow:5">
          <input
            type="password"
            className="form-control"
            id="floatingRetypePassword"
            placeholder="Re-type password"
            name="retype_password"
            minLength={5}
            onChange={(e) => {
              if (e.target.value !== password) {
                setErrorMessage("Passwords do not match");
                document.querySelector("button").disabled = true;
              } else {
                setErrorMessage("");
                document.querySelector("button").disabled = false;
              }
            }}
            required
          />
          <label htmlFor="floatingPassword">Re-type password</label>
        </div>
        <button type="submit" className="btn btn-lg btn-primary mb-3">
          Register
        </button>
      </form>
    </div>
  );
};

function sendCredentials(event, setErrorMessage, navigate) {
  event.preventDefault();

  let success = false;

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

  fetch("http://localhost:4000/users", requestOptions)
    .then((response) => {
      button.disabled = false;

      if (response.status === 201) {
        navigate("/login");
        success = true;
        return;
      } else {
        return response.json();
      }
    })
    .then((result) => {
      if (!success) {
        if (result.details) {
          setErrorMessage(
            result.details[0].message
              .replace(/"first_name"/, "First name")
              .replace(/"last_name"/, "Last name")
              .replace(/"user_email"/, "Email address")
              .replace(/"password"/, "Password")
              .replace(
                /"retype_password" must be \[ref:password\]/,
                "Passwords do not match"
              )
          );
        } else if (result.message) {
          setErrorMessage(result.message);
        }
      }
    })
    .catch((error) => console.log("error", error));
}

export default SignUp;
