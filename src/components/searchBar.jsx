import React from "react";

const SearchBar = (props) => {
  const placeholder_value = props.placeholder_value;
  const query = props.query;
  const setQuery = props.setQuery;

  return (
    <div className="input-group mb-3 search-bar">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder_value}
        aria-label={placeholder_value}
        aria-describedby="button-addon2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon"
      >
      Search
      </button> */}
    </div>
  );
};

export default SearchBar;
