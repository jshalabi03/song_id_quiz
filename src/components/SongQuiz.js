import React from "react";
import { useState, useEffect, useRef } from "react";
import "./SongQuiz.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

import {
  faPlay,
  faPause,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const SongQuiz = ({ artist, artistTracks, onQuizFinish, numRounds }) => {
  const selectTracks = (numTracks) => {
    let arr = artistTracks.slice();
    arr.sort(() => Math.random() - 0.5);
    return arr.slice(0, numTracks);
  };

  const [trackQueue, setTrackQueue] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm !== "") {
      const filteredResults = artistTracks.filter((track) => {
        return track.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleTrackClick = (track) => {
    if (track.id === trackQueue[currentTrackIndex].id) {
      Swal.fire({
        title: "Correct!",
        text: `The answer was ${trackQueue[currentTrackIndex].title}!`,
        icon: "success",
        confirmButtonText: "Next Track",
      });
    } else {
      Swal.fire({
        title: "Incorrect!",
        text: `The answer was ${trackQueue[currentTrackIndex].title}!`,
        icon: "error",
        confirmButtonText: "Next Track",
      });
    }
    handleNextTrack();
  };

  const audioPlayerRef = useRef(null);
  const progressRef = useRef(null);

  // TODO: Change to custom amount of rounds
  useEffect(() => {
    setTrackQueue(selectTracks(artistTracks.length));
    setCurrentTrackIndex(0);
  }, [artistTracks]);

  const handlePlay = () => {
    if (audioPlayerRef.current.currentTime >= 5) {
      audioPlayerRef.current.currentTime = 0;
    }
    audioPlayerRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioPlayerRef.current.pause();
    setIsPlaying(false);
  };

  const handleEnd = () => {
    audioPlayerRef.current.pause();
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    const progress = (audioPlayerRef.current.currentTime / 5) * 100;
    progressRef.current.value = progress;
    if (audioPlayerRef.current.currentTime >= 5) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleNextTrack = () => {
    progressRef.current.value = 0;
    if (currentTrackIndex < trackQueue.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setIsPlaying(false);
      setSearchTerm("");
    } else {
      onQuizFinish();
    }
  };

  if (trackQueue.length === 0) return <h1>...</h1>;
  return (
    <div className="song-quiz">
      <div>
        <FontAwesomeIcon
          className="go-back-button"
          icon={faArrowLeft}
          onClick={onQuizFinish}
        />
      </div>
      <img src={artist.picture_medium} alt={artist.name}></img>
      <h2>{artist.name}</h2>
      <div>
        <progress
          className="progress-bar"
          ref={progressRef}
          value={0}
          max={100}
        ></progress>
      </div>
      <div>
        <audio
          ref={audioPlayerRef}
          src={trackQueue[currentTrackIndex].preview}
          onEnded={handleEnd}
          onTimeUpdate={handleTimeUpdate}
        ></audio>
      </div>
      <div>
        {isPlaying ? (
          <button onClick={handlePause}>
            <FontAwesomeIcon icon={faPause} />
          </button>
        ) : (
          <button onClick={handlePlay}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
      </div>

      {/* <button onClick={handleNextTrack}>Next</button> */}

      <div className="track-search">
        <input
          type="text"
          value={searchTerm}
          placeholder="Guess the track"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="track-results">
        {searchResults.map((track) => (
          <li key={track.id} onClick={() => handleTrackClick(track)}>
            {track.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongQuiz;
