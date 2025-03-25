import React, { useState, useEffect, useCallback } from 'react';
import './App.css'; // Import the custom CSS

function App({ apiUrl = 'http://localhost:5000' }) {
  const [projects, setProjects] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [newProjectName, setNewProjectName] = useState('');
  const [error, setError] = useState('');

  const fetchProjects = useCallback(async () => {
    try {
      const projectsResponse = await fetch(`${apiUrl}/api/projects`);
      if (!projectsResponse.ok) {
        throw new Error(`Failed to fetch projects: ${projectsResponse.status}`);
      }
      const projectsData = await projectsResponse.json();
      setProjects(projectsData || []);

      const countResponse = await fetch(`${apiUrl}/api/projects/count`);
      if (!countResponse.ok) {
        throw new Error(`Failed to fetch project count: ${countResponse.status}`);
      }
      const countData = await countResponse.json();
      setProjectCount(countData.count || 0);
    } catch (err) {
      console.error('Fetch Projects Error:', err);
      setError('Failed to fetch projects');
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAddProject = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`${apiUrl}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProjectName }),
      });
      if (!response.ok) {
        throw new Error(`Failed to add project: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 'error') {
        setError(data.message);
      } else {
        setNewProjectName('');
        fetchProjects();
      }
    } catch (err) {
      console.error('Add Project Error:', err);
      setError('Failed to add project');
    }
  };

  const handleDeleteProject = async (id) => {
    setError('');
    try {
      const response = await fetch(`${apiUrl}/api/projects/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Failed to delete project: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 'error') {
        setError(data.message);
      } else {
        fetchProjects();
      }
    } catch (err) {
      console.error('Delete Project Error:', err);
      setError('Failed to delete project');
    }
  };

  const refreshProjects = () => {
    setError('');
    fetchProjects();
  };

  return (
    <div className="app-container">
      <h1>Project Manager</h1>
      <p>Total Projects: {projectCount}</p>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleAddProject}>
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Enter project name"
          required
        />
        <button type="submit">Add Project</button>
      </form> 
     <button onClick={refreshProjects} className="refresh-btn">  
        Refresh Projects
      </button>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            {project.name}
            <button
              onClick={() => handleDeleteProject(project.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;