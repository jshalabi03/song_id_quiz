import "./App.css";
import { useState, useEffect } from "react";
import { searchArtists, getArtistTracks } from "./services/deezer";
import { AUTH_URL } from "./services/authorize";
import SearchBar from "./components/SearchBar";
import ArtistResults from "./components/ArtistResults";
import ArtistSearch from "./components/ArtistSearch";

const App = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);

  // TODO: Add error handling if user rejects authorization
  const [token, setToken] = useState(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash);
    const token = urlParams.get("access_token");
    if (token) {
      setToken(token);
      console.log("token: ", token);
    } else {
      console.log("no token");
    }
  }, []);

  function handleArtistClick(artist) {
    setSelectedArtist(artist);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Identify The Song!</h1>
        <ArtistSearch onArtistClick={handleArtistClick} />
        {/* <SearchBar
          searchQuery={searchQuery}
          handleSearchQueryChange={handleSearchQueryChange}
          handleSearchQuerySubmit={handleSearchSubmit}
        />
        <ArtistResults
          artistResults={artists}
          onArtistClick={handleArtistClick}
        /> */}
        <button onClick={() => console.log(selectedArtist)}>Log Artist</button>
      </header>
    </div>
  );
};

export default App;

// const getArtist = async () => {
//   const artists = await searchArtists("The Strokes");
//   setArtist(artists.data[0]);
// };

// const getTracks = async () => {
//   const tracks = await getArtistTracks(myArtist);
//   console.log(tracks);
// };
