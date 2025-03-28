import { useState } from 'react'
import ProjectList from './ProjectList.jsx'
import './App.css'

function App() {
  const [projects, setProjects] = useState([]);

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]); // Add new project to state
  };

  return (
    <div>
      <h1>Project Time Tracker</h1>
      <p>Track your projects with ease!</p>
      <ProjectList projects={projects} onAddProject={handleAddProject}/>
    </div>
  )
}

export default App
