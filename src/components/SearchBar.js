import React from "react";
import "./SearchBar.css";

const SearchBar = ({
  searchQuery,
  handleSearchQueryChange,
  handleSearchQuerySubmit,
  placeholder,
}) => {
  return (
    <div className="search-bar">
      <form onSubmit={handleSearchQuerySubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder={placeholder}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
