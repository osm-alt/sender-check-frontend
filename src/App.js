import logo from "./logo.svg";
import "./App.css";
import SideBar from "./components/sideBar";
import SearchBar from "./components/searchBar";
import React from "react";

function App() {
  return (
    <div className="app-grid">
      <SideBar />

      <SearchBar />
    </div>
  );
}

export default App;
