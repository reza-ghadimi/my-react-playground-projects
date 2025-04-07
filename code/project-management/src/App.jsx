import './App.css'

import { useState } from 'react'

import Sidebar from './components/Sidebar.jsx'
import Project from './components/Project.jsx'

function App() {

  const [projects, setProjects] = useState([]);
  const [project, selectProject] = useState(null);

  function openProject({ id } = {}) {
    if (id == null) {
      selectProject(null);
    } else {
      const selectedProject = projects.find((p) => p.id === id);
      if (selectedProject) {
        selectProject({ ...selectedProject });
      } else {
        selectProject(null);
      }
    }
  }

  function saveProject({ project }) {
    console.log(`saveProject: ${project?.id}`);

    // Ensure the project gets an ID, either from the current project or the max id + 1
    project.id = project?.id ?? (projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1);

    console.log(`saveProject: ${project?.id}`);

    const currentProject = {
      id: project.id,
      title: project.title,
      tasks: project.tasks,
      dueDate: project.dueDate,
      description: project.description
    };

    setProjects((prevProjects) => {
      const index = prevProjects.findIndex((p) => p.id === currentProject.id);

      if (index !== -1) {
        // Update the existing project
        const updated = [...prevProjects];
        updated[index] = currentProject;
        return updated;
      }

      // Add new project if it doesn't exist
      return [...prevProjects, currentProject];
    });

    // Immediately select the project after saving (this will allow the delete button to show)
    selectProject({ ...currentProject });
  }

  function deleteProject({ id }) {
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));

    selectProject(null);
  }

  return (
    <>
      <Sidebar projectsList={projects} handleClick={openProject} />
      <div className="flex-1 overflow-y-auto bg-white">
        <Project key={project?.id ?? 'new'} project={project} handleDelete={deleteProject} handleSave={saveProject} />
      </div>
    </>
  )
}

export default App
