import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <Filler progress={progress} />
    </div>
  );
};

const Filler = ({ progress }) => {
  if (progress == 0) return <></>;
  return (
    <div className="filler" style={{ width: `${(progress / 106) * 100}%` }} />
  );
};

export default ProgressBar;
