import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/sideBar";
import Home from "./components/home";
import TrustedSenders from "./components/trustedSenders";

function App() {
  return <div className="app-grid">{routes}</div>;
}

const routes = (
  <BrowserRouter>
    <SideBar />
    <Routes>
      <Route path="/" element={<Home />} exact={true} />
      <Route
        path="/trusted_senders"
        element={<TrustedSenders />}
        exact={true}
      />
      {/* <Route path="/" component={SideBar} exact={true}></Route>
      <Route path="/" component={SideBar} exact={true}></Route>
      <Route path="/" component={SideBar} exact={true}></Route> */}
    </Routes>
  </BrowserRouter>
);

export default App;
