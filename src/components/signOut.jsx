import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("sc_authenticated");

  if (!loggedInUser) {
    return <Navigate replace to="/login" />;
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    refresh_token: localStorage.getItem("sc_ref_token"),
  });

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:4000/logout", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  localStorage.clear();

  navigate("/login");
};

export default SignOut;
