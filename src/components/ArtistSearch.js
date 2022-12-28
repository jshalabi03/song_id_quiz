import React from "react";
import { useState } from "react";
import { searchArtists } from "../services/deezer";
import SearchBar from "./SearchBar";
import ArtistResults from "./ArtistResults";

const ArtistSearch = ({ onArtistClick }) => {
  const [artistResults, setArtistResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value);
  }

  async function handleSearchQuerySubmit(event) {
    event.preventDefault();

    const data = await searchArtists(searchQuery);
    setArtistResults(data);

    searchQuery = "";
  }

  return (
    <div className="artist-search">
      <SearchBar
        searchQuery={searchQuery}
        handleSearchQueryChange={handleSearchQueryChange}
        handleSearchQuerySubmit={handleSearchQuerySubmit}
      />
      <ArtistResults
        artistResults={artistResults}
        onArtistClick={onArtistClick}
      />
    </div>
  );
};

export default ArtistSearch;
