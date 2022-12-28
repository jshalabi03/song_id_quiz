import React from "react";

const SearchBar = ({
  searchQuery,
  handleSearchQueryChange,
  handleSearchQuerySubmit,
}) => {
  return (
    <div className="search-bar">
      <form onSubmit={handleSearchQuerySubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
