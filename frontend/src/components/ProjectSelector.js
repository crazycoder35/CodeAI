import React, { useState, useEffect } from 'react';

function ProjectSelector({ onSelectProject }) {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8000/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to fetch projects. Please try again.');
    }
  };

  const handleProjectSelect = (project) => {
    onSelectProject(project);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newProjectName,
          description: newProjectDescription,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create project');
      }
      const newProject = await response.json();
      setProjects([...projects, newProject]);
      setNewProjectName('');
      setNewProjectDescription('');
      onSelectProject(newProject);
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Failed to create project. Please try again.');
    }
  };

  return (
    <div className="project-selector">
      <h2>Select a Project</h2>
      <ul className="project-list">
        {projects.map(project => (
          <li key={project.id} onClick={() => handleProjectSelect(project)} className="project-item">
            {project.name}
          </li>
        ))}
      </ul>
      <h3>Create New Project</h3>
      <form onSubmit={handleCreateProject}>
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Project Name"
          required
          className="input-field"
        />
        <textarea
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
          placeholder="Project Description"
          className="textarea-field"
        />
        <button type="submit" className="button">Create Project</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default ProjectSelector;