# Project Manager App

**Submitted by**: Syeda Laiba Zehra
**Date**: 25 March 2025  

## Overview
This is a web application built for a university assignment using React (frontend) and Node.js with Express (backend). The Project Manager app allows users to manage a list of projects by adding new projects, deleting existing ones, and refreshing the project list. It includes a backend API to handle project data and a user-friendly frontend interface with error handling and dynamic updates.

## Features
- **Add Projects**: Users can add a new project by entering a name (minimum 3 characters, no duplicates allowed).
- **Delete Projects**: Users can delete a project by clicking the "Delete" button next to it.
- **Refresh Projects**: A "Refresh Projects" button fetches the latest project list from the backend.
- **Project Count**: Displays the total number of projects (e.g., "Total Projects: 3").
- **Error Handling**: Shows error messages for invalid inputs or failed operations (e.g., "Project name already exists").
- **Case-Insensitive Validation**: Prevents duplicate project names (e.g., "Project A" and "project a" are treated as the same).
- **Styling**: The app has a clean design with a semi-transparent background, centered layout, and the "Roboto" font (via Google Fonts).

## Technical Details
- **Backend (server.js)**:
  - Built with Node.js and Express.
  - Stores project data in an in-memory array (`projects`).
  - API Endpoints:
    - `GET /api/projects`: Returns the list of all projects.
    - `GET /api/projects/:id`: Returns a specific project by ID.
    - `GET /api/projects/count`: Returns the total number of projects.
    - `POST /api/projects`: Adds a new project with validation.
    - `DELETE /api/projects/:id`: Deletes a project by ID.
    - `PUT /api/projects/:id`: Updates a project’s name.
  - Includes CORS support and proper error handling with status codes (e.g., 404, 400).
- **Frontend (App.js)**:
  - Built with React using `create-user-app`.
  - Uses React hooks (`useState`, `useEffect`, `useCallback`) for state management and API calls.
  - Communicates with the backend using the `fetch` API.
- **Styling (App.css)**:
  - Custom CSS with a semi-transparent background, hover effects on buttons, and error messages in red.
- **File Structure**:
  - `server.js`: Backend server.
  - `frontend/src/App.js`: Main React component.
  - `frontend/src/App.css`: Styles for the app.
  - `frontend/public/index.html`: HTML entry point with metadata and Google Fonts.

## How to Run the App
1. **Prerequisites**:
   - Install Node.js and npm on your system.
2. **Setup**:
   - Clone or unzip the project folder.
   - Open a terminal in the project root directory.
   - Install backend dependencies: `npm install`.
   - Navigate to the `frontend` folder: `cd frontend`.
   - Install frontend dependencies: `npm install`.
3. **Run the Backend**:
   - In the project root directory, run: `node server.js`.
   - The server will start at `http://localhost:5000`.
4. **Run the Frontend**:
   - In the `frontend` folder, run: `npm start`.
   - The app will open in your browser at `http://localhost:3000`.
5. **Test the App**:
   - Add a new project using the input field and "Add Project" button.
   - Delete a project by clicking the "Delete" button next to it.
   - Refresh the project list using the "Refresh Projects" button.

## Verifying the Backend Using curl
You can test the backend API directly using `curl` commands in a terminal:
- **View All Projects**:
  ```bash
  curl http://localhost:5000/api/projects