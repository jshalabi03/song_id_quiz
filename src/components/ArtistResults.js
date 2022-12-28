import React from "react";
import "./ArtistResults.css";

const ArtistResults = ({ artistResults }) => {
  if (!artistResults || artistResults.length === 0) return <></>;
  return (
    <div className="artist-results">
      <ul>
        {artistResults.map((artist) => (
          <li key={artist.id}>
            <button onClick={() => console.log("hello")}>
              <img src={artist.picture_medium} alt={artist.name} />
              <h3>{artist.name}</h3>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistResults;
