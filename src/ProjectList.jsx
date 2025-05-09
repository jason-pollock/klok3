import { useState } from "react";

function ProjectList({
  projects,
  onAddProject,
  onSelectProject,
  selectedProjectId,
}) {
  const [newProjectName, setNewProjectName] = useState("");

  const handleAddProjectClick = () => {
    if (!newProjectName.trim()) {
      return;
    } // Prevent empty projects.
    onAddProject(newProjectName); // Send new project name to parent. Since `onAddProject` is the name of the prop, it calls the function passed from the parent component.
    setNewProjectName(""); // Clear input after adding.
  };

  return (
    <div>
      <h2>Project</h2>

      <div>
        {/* Input for adding projects */}
        <input
          type="text"
          placeholder="Enter project name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <button onClick={handleAddProjectClick}>Add Project</button>
      </div>

      {/* Display project list */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {projects.map((project) => (
          <li
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            style={{
              padding: '8px',
              margin: '4px 0',
              cursor: 'pointer',
              border: '1px solid #555',
              borderRadius: '4px',
              // Basic highlighting for the selected project
              backgroundColor: project.id === selectedProjectId ? '#444' : 'transparent',
              fontWeight: project.id === selectedProjectId ? 'bold' : 'normal',
            }}
          >{project.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
