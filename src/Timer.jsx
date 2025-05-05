import React, { useState, useEffect } from "react";

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer logic using useEffect
  useEffect(() => {
    let intervalId = null; // Variable to hold the interval ID

    if (isRunning) {
      // Start the interval timer
      intervalId = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      // If isRunning is false, do nothing (the interval below will be cleared if it exists).
    }

    // --- Cleanup Function ---
    // This function is returned by useEffect and runs:
    // 1. When the component unmounts (is removed from the screen).
    // 2. BEFORE the effect runs again due to a dependency change (in this case, 'isRunning').
    // Its purpose here is to stop the *previous* interval when 'isRunning' changes to false,
    // or when the component is about to be destroyed.
    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clear the interval when the component unmounts or isRunning changes
        console.log("Interval cleared", intervalId);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    console.log("Start button clicked - setting isRunning to true");
    setIsRunning(true); // Start the timer
  };

  const handleStop = () => {
    console.log("Stop button clicked - setting isRunning to false");
    setIsRunning(false); // Stop the timer
  };

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
      <h2>Timer</h2>

      <div className="timer-display">
        {/* Display the elapsed time in a formatted way */}
        Time: {formatTime(elapsedTime)}
      </div>

      <div className="timer-controls">
        {/* The onClick prop takes a function reference. */}
        {/* When the button is clicked, the referenced function (handleStart or handleStop) is executed. */}
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default Timer;
