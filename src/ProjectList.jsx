import { useState } from 'react';

function ProjectList({ projects, onAddProject }) {
  const [newProjectName, setNewProjectName] = useState("");

  const handleAddProject = () => {
    if (!newProjectName.trim()) {return} // Prevent empty projects.

    onAddProject(newProjectName); // Send new project name to parent. Since `onAddProject` is the name of the prop, it calls the function passed from the parent component.
    setNewProjectName(""); // Clear input after adding.
  };

  return (
    <div>
      <h2>Project</h2>

      {/* Input for adding projects */}
      <input
        type="text"
        placeholder="Enter project name"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
      />
      <button onClick={handleAddProject}>Add Project</button>

      {/* Display project list */}
      <ul>
        {projects.map((project, index) => (
          <li key={index}>{project}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;

