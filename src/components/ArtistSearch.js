import React from "react";
import { useState } from "react";
import { searchArtists } from "../services/deezer";
import SearchBar from "./SearchBar";
import ArtistResults from "./ArtistResults";
import Swal from "sweetalert2";

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

    if (!data) {
      Swal.fire({
        title: "Error",
        html: 'Due to the nature of this deployment, the client must use a <a href="https://mybrowseraddon.com/access-control-allow-origin.html">CORS proxy</a> to make requests to the Deezer API',
        icon: "warning",
      });
    }

    setArtistResults(data);
    setSearchQuery("");
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
