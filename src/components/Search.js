import React, { useState } from "react";

const Search = (props) => {
  const { search, setSearch, setLoading } = props;

  function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
  }

  return (
    <div className="search-container">
      <div>
        <label htmlFor="search-title">Search by title</label>
        <input
          id="search-title"
          type="text"
          placeholder="Enter film title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button onClick={(e) => handleSearch(e)}>Search!</button>
    </div>
  );
};

export default Search;
