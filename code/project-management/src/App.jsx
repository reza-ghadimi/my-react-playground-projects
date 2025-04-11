import './App.css';

import { useState } from 'react';

import Sidebar from './components/Sidebar.jsx';
import Project from './components/Project.jsx';

const App = () => {
  const [state, setState] = useState({
    selectedProject: null,
    projects: [],
  });

  const { selectedProject, projects } = state;

  function openProject({ id } = {}) {
    if (id == null) {
      setState((current) => ({
        ...current,
        selectedProject: null,
      }));
    } else {
      const foundProject = projects.find((project) => project.id === id);
      setState((current) => ({
        ...current,
        selectedProject: foundProject,
      }));
    }
  }

  function saveProject({ project }) {
    const projectId = project?.id ?? (projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1);

    const currentProject = {
      ...project,
      id: projectId,
    };

    const updatedProjects = [...projects];
    const index = updatedProjects.findIndex((p) => p.id === projectId);

    if (index !== -1) {
      updatedProjects[index] = currentProject;
    } else {
      updatedProjects.push(currentProject);
    }

    setState((prev) => ({
      ...prev,
      selectedProject: currentProject,
      projects: updatedProjects,
    }));
  }

  function deleteProject({ id }) {
    const filteredProjects = projects.filter((project) => project.id !== id);

    setState((current) => ({
      ...current,
      projects: filteredProjects,
      selectedProject: null,
    }));
  }

  return (
    <>
      <Sidebar projects={projects} selectedId={selectedProject?.id} handleClick={openProject} />
      <div className="flex-1 overflow-y-auto bg-white">
        <Project
          key={selectedProject?.id ?? 'new'}
          project={selectedProject}
          handleDelete={deleteProject}
          handleSave={saveProject}
        />
      </div>
    </>
  );
};

export default App;
