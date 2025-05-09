import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList.jsx";
import Timer from "./Timer.jsx";
import "./App.css";

function App() {
  // State for the list of projects
  const [projects, setProjects] = useState([
    { id: 1, name: "Build something with React" },
    { id: 2, name: "Make more things" },
  ]);
  const [nextId, setNextId] = useState(3);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
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

  const handleAddProject = (projectName) => {
    const newProject = {
      id: nextId,
      name: projectName,
      // We could add things like "color" or "description" here later.
    };

    // Update the projects array with state.
    setProjects([...projects, newProject]); // Add new project to state
    setNextId(nextId + 1); // Increment the next ID for future projects
  };

  const handleSelectProject = (projectId) => {
    // Check if we aer switching to a different project while the timer is running.
    if (isRunning && projectId !== selectedProjectId) {
      // If so, stop the timer.
      setIsRunning(false);
      setElapsedTime(0); // Reset elapsed time
    }

    console.log(`App: Setting project ID to ${projectId}`);
    setSelectedProjectId(projectId); // Update the selected project ID
  };

  // --- Timer Handlers ---
  const handleStart = () => {
    if (!selectedProjectId) {
      alert("Please select a project before starting the timer!");
      return;
    }
    console.log(`App: Timer started on project ${selectedProjectId}`);
    setIsRunning(true);
  };

  const handleStop = () => {
    if (!isRunning) return;
    console.log(`App: Stop timer for project ID: ${selectedProjectId}`);
    setIsRunning(false);
    // TODO: Trigger saving 'elapsedTime' to the selected project.
  };

  const handleReset = () => {
    console.log("Resetting timer");
    setIsRunning(false); // Stop the timer
    setElapsedTime(0); // Reset elapsed time
  };

  // Derived state
  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || null;

  return (
    <div>
      <h1>Project Time Tracker</h1>
      <p>Track your projects with ease!</p>

      {/* Pass all timer-related state and hanlers down to Timer */}
      <Timer
        selectedProjectName={selectedProject ? selectedProject.name : null}
        selectedProjectId={selectedProjectId}
        isRunning={isRunning}
        elapsedTime={elapsedTime}
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
      />

      <hr />

      <ProjectList
        projects={projects}
        onAddProject={handleAddProject}
        onSelectProject={handleSelectProject}
        selectedProjectId={selectedProjectId}
      />
    </div>
  );
}

export default App;
