import "./App.css";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SideBar from "./components/sideBar";
import Home from "./components/home";
import TrustedSenders from "./components/trustedSenders";
import UntrustedSenders from "./components/untrustedSenders";
import TrustedDomains from "./components/trustedDomains";
import UntrustedDomains from "./components/untrustedDomains";
import PermittedUsers from "./components/permittedUsers";
import SignOut from "./components/signOut";
import ChooseList from "./components/chooseList";

const App = () => {
  const loggedInUser = localStorage.getItem("sc_authenticated");

  if (!loggedInUser) {
    return <Navigate replace to="/login" />;
  } else {
    return <div className="app-grid">{routes}</div>;
  }
};

const routes = (
  <>
    <SideBar />
    <Routes>
      <Route path="/" element={<Home />} exact={true} />
      <Route path="/lists" element={<ChooseList />} exact={true} />
      <Route
        path="/trusted_senders"
        element={<TrustedSenders />}
        exact={true}
      />
      <Route
        path="/untrusted_senders"
        element={<UntrustedSenders />}
        exact={true}
      />
      <Route
        path="/trusted_domains"
        element={<TrustedDomains />}
        exact={true}
      />
      <Route
        path="/untrusted_domains"
        element={<UntrustedDomains />}
        exact={true}
      />
      <Route
        path="/permitted_users"
        element={<PermittedUsers />}
        exact={true}
      />
      <Route path="/sign_out" element={<SignOut />} exact={true} />
    </Routes>
  </>
);

export default App;
