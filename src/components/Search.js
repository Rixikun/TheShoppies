import React from "react";

const Search = (props) => {
  const { search, setSearch, setLoading } = props;

  function handleSearch() {
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
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
      </div>
      <button onClick={handleSearch}>Search!</button>
    </div>
  );
};

export default Search;
