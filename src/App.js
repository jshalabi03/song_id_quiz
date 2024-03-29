import "./App.css";
import { useState, useEffect } from "react";
import { getArtistTracks } from "./services/deezer";
import ArtistSearch from "./components/ArtistSearch";
import SongQuiz from "./components/SongQuiz";

const App = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [tracks, setTracks] = useState([]);

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
  }, [token]);

  async function handleArtistClick(artist) {
    setSelectedArtist(artist);
    const tracks = await getArtistTracks(artist);
    setTracks(tracks);
  }

  function onQuizFinish() {
    setSelectedArtist(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Identify The Song!</h1>
        {!selectedArtist ? (
          <ArtistSearch onArtistClick={handleArtistClick} />
        ) : (
          <SongQuiz
            artist={selectedArtist}
            artistTracks={tracks}
            onQuizFinish={onQuizFinish}
            numRounds={3}
          />
        )}
      </header>
    </div>
  );
};

export default App;
