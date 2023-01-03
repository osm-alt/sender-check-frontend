import React, { Component } from "react";

class SearchBar extends Component {
  state = {};
  render() {
    return (
      <div className="input-group mb-3 search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Sender's name"
          aria-label="Sender's name"
          aria-describedby="button-addon2"
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
