import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    placeholder_value: this.props.placeholder_value,
  };
  render() {
    return (
      <div className="input-group mb-3 search-bar">
        <input
          type="text"
          className="form-control"
          placeholder={this.state.placeholder_value}
          aria-label={this.state.placeholder_value}
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
