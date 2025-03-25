const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for projects
let projects = [
  { id: 1, name: 'Project A' },
  { id: 2, name: 'Project B' },
  { id: 3, name: 'Project C' }
];

// Helper to check for duplicate project names (case-insensitive)
const isDuplicateName = (name) => {
  return projects.some(project => project.name.toLowerCase() === name.toLowerCase());
};

// Root route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Welcome to the Project Manager API! Use /api/projects to interact with projects.');
});

// GET /api/projects - Return the list of projects
app.get('/api/projects', (req, res) => {
  res.json(projects || []);
});

// GET /api/projects/count - Return the total number of projects
app.get('/api/projects/count', (req, res) => {
  res.json({ count: projects.length });
});

// POST /api/projects - Add a new project
app.post('/api/projects', (req, res) => {
  const { name } = req.body;

  // Validation: Name must be at least 3 characters
  if (!name || name.length < 3) {
    return res.status(400).json({ status: 'error', message: 'Project name must be at least 3 characters' });
  }

  // Check for duplicates (case-insensitive)
  if (isDuplicateName(name)) {
    return res.status(400).json({ status: 'error', message: 'Project name already exists' });
  }

  const newProject = {
    id: projects.length + 1,
    name
  };
  projects.push(newProject);
  res.status(201).json({ status: 'success', project: newProject });
});

app.get('/api/projects/:id', (req, res) => {
  console.log(`Received GET request for project ID: ${req.params.id}`);
  const id = parseInt(req.params.id);
  const project = projects.find(project => project.id === id);
  if (!project) {
    return res.status(404).json({ status: 'error', message: 'Project not found' });
  }
  res.json(project);
});

// DELETE /api/projects/:id - Delete a project by ID
app.delete('/api/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex === -1) {
    return res.status(404).json({ status: 'error', message: 'Project not found' });
  }

  const deletedProject = projects.splice(projectIndex, 1)[0];
  res.json({ status: 'success', project: deletedProject });
});

// PUT /api/projects/:id - Update a project
app.put('/api/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  if (!name || name.length < 3) {
    return res.status(400).json({ status: 'error', message: 'Project name must be at least 3 characters' });
  }

  const project = projects.find(project => project.id === id);
  if (!project) {
    return res.status(404).json({ status: 'error', message: 'Project not found' });
  }

  if (isDuplicateName(name) && name.toLowerCase() !== project.name.toLowerCase()) {
    return res.status(400).json({ status: 'error', message: 'Project name already exists' });
  }

  project.name = name;
  res.json({ status: 'success', project });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));