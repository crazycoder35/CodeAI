import React from 'react';

function ProjectStatus({ project }) {
  if (!project) {
    return <div className="project-status">No project selected</div>;
  }

  return (
    <div className="project-status">
      <h2>Project Status</h2>
      <div className="project-info">
        <p><strong>Name:</strong> {project.name}</p>
        <p><strong>Description:</strong> {project.description || 'No description provided'}</p>
        <p><strong>Path:</strong> {project.path}</p>
        <p><strong>Status:</strong> {project.status}</p>
      </div>
      <div className="project-agents">
        <h3>Active Agents:</h3>
        <ul>
          {project.agents.map((agent, index) => (
            <li key={index}>{agent}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectStatus;