import "./App.css";
import { useState, useEffect } from "react";
import { searchArtists, getArtistTracks } from "./services/deezer";
import { AUTH_URL } from "./services/authorize";
import SearchBar from "./components/SearchBar";
import ArtistResults from "./components/ArtistResults";

const App = () => {
  const [token, setToken] = useState(null);

  const [artists, setArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // TODO: Add error handling if user rejects authorization
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

  function test() {
    const res = searchArtists("The Strokes");
    console.log("res: ", res);
  }

  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value);
  }

  async function handleSearchSubmit(event) {
    event.preventDefault();
    const data = await searchArtists(searchQuery);
    setArtists(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Identify The Song!</h1>
        <a href={AUTH_URL}>Login with Deezer</a>
        <SearchBar
          searchQuery={searchQuery}
          handleChange={handleSearchQueryChange}
          handleSubmit={handleSearchSubmit}
        />
        <button onClick={() => console.log(artists)}>Log Artists</button>
        <ArtistResults artistResults={artists} />
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
