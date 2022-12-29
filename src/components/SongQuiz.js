import React from "react";
import { useState, useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";
import "./SongQuiz.css";

const SongQuiz = ({ artist, artistTracks, onQuizFinish, numRounds }) => {
  const selectTracks = () => {
    let arr = artistTracks.slice();
    arr.sort(() => Math.random() - 0.5);
    return arr.slice(0, numRounds);
  };

  const [trackQueue, setTrackQueue] = useState(selectTracks());
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressInterval, setProgressInterval] = useState(null);

  const audioPlayerRef = useRef(null);

  const updateProgress = () => {
    if (progress >= 100) {
      clearInterval(progressInterval);
    } else {
      setProgress((progress) => progress + 1);
    }
    console.log("progress: ", progress);
  };

  useEffect(() => {
    setTrackQueue(selectTracks(numRounds));
    setCurrentTrackIndex(0);
  }, [artistTracks]);

  const handlePlay = () => {
    audioPlayerRef.current.currentTime = 0;
    audioPlayerRef.current.play();
    setIsPlaying(true);
    setProgress(0);
    const interval = setInterval(updateProgress, 50);
    setProgressInterval(interval);
  };

  const handlePause = () => {
    audioPlayerRef.current.pause();
    setIsPlaying(false);
    clearInterval(progressInterval);
  };

  const handleEnd = () => {
    audioPlayerRef.current.pause();
    setIsPlaying(false);
    clearInterval(progressInterval);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    // const progress = (audioPlayerRef.current.currentTime / 5) * 100;
    // setProgress(progress);
    if (audioPlayerRef.current.currentTime >= 5) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
      clearInterval(progressInterval);
    }
    // console.log("progress: ", progress);
    // console.log("interval: ", progressInterval);
  };

  const handleNextTrack = () => {
    setProgress(0);
    clearInterval(progressInterval);
    if (currentTrackIndex < trackQueue.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setIsPlaying(false);
    } else {
      onQuizFinish();
    }
  };

  if (trackQueue.length === 0) return <h1>...</h1>;
  return (
    <div className="song-quiz">
      <img src={artist.picture_medium} alt={artist.name}></img>
      <h2>{artist.name}</h2>
      <ProgressBar progress={progress} />
      <button onClick={() => console.log(trackQueue)}>log</button>
      <div>
        <audio
          ref={audioPlayerRef}
          src={trackQueue[currentTrackIndex].preview}
          onEnded={handleEnd}
          onTimeUpdate={handleTimeUpdate}
        ></audio>
      </div>
      <div>
        {isPlaying ? <></> : <button onClick={handlePlay}>Play</button>}
      </div>
      <button onClick={handleNextTrack}>Next</button>
    </div>
  );
};

export default SongQuiz;
