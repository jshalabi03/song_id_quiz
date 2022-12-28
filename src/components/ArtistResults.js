import React from "react";

const ArtistResults = ({ artistResults }) => {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {artistResults.map((artist) => (
        <li key={artist.id} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex" }}>
            <img
              src={artist.picture_small}
              alt={artist.name}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <h3>{artist.name}</h3>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ArtistResults;
