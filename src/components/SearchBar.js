import React from "react";

const SearchBar = ({ searchQuery, handleChange, handleSubmit }) => {
  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
