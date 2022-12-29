import React from "react";
import { useState } from "react";
import { searchArtists } from "../services/deezer";
import SearchBar from "./SearchBar";
import ArtistResults from "./ArtistResults";

const ArtistSearch = ({ onArtistClick }) => {
  const [artistResults, setArtistResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchQuerySubmit = async (event) => {
    event.preventDefault();
    if (searchQuery === "") return;

    const data = await searchArtists(searchQuery);
    setArtistResults(data);

    searchQuery = "";
  };

  return (
    <div className="artist-search">
      <SearchBar
        searchQuery={searchQuery}
        handleSearchQueryChange={handleSearchQueryChange}
        handleSearchQuerySubmit={handleSearchQuerySubmit}
        placeholder="Search for an artist"
      />
      <ArtistResults
        artistResults={artistResults}
        onArtistClick={onArtistClick}
      />
    </div>
  );
};

export default ArtistSearch;