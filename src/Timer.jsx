import React, { useState, useEffect } from "react";

function Timer({
  selectedProjectName,
  selectedProjectId,
  isRunning,
  elapsedTime,
  onStart, // Renamed props slightly for clarity. (onStart insead of handleStart)
  onStop,
  onReset,
}) {
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    // Pad single-digit numbers with leading zeros
    const pad = (num) => (num < 10 ? `0${num}` : num);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <div className="timer-container">
      <h2>
        Timer{" "}
        {selectedProjectName
          ? `for: ${selectedProjectName}`
          : "(No project selected)"}
      </h2>

      <div className="timer-display">
        {/* Display the elapsed time based on elapsedTime prop */}
        Time: {formatTime(elapsedTime)}
      </div>

      <div className="timer-controls">
        {/* The onClick prop takes a function reference. */}
        {/* When the button is clicked, the referenced function (handleStart or handleStop) is executed. */}
        {/* Disabled based on prop */}
        <button onClick={onStart} disabled={isRunning || !selectedProjectId}>
          Start
        </button>
        <button onClick={onStop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={onReset} disabled={!isRunning}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
