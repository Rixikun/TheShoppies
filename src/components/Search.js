import React, { useState } from "react";

const Search = (props) => {
  const { search, setSearch, setLoading } = props;

  function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
  }

  return (
    <div className="search-container">
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Film title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={(e) => handleSearch(e)}>Search!</button>
    </div>
  );
};

export default Search;
