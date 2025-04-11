import React, { useState } from "react";

import InputField from "./InputField";
import SaveButton from './SaveButton';
import DeleteButton from './DeleteButton';
import TaskManagement from './TaskManagement';

export default function Project({ project, handleDelete, handleSave }) {
    const [projectData, setProjectData] = useState({
        title: project?.title,
        dueDate: project?.dueDate,
        description: project?.description,
        tasks: project?.tasks || []
    });

    const addTask = () => {
        console.log("Add Task");

        const newTask = { id: Date.now(), title: "", completed: false };
        setProjectData((prev) => ({
            ...prev,
            tasks: [...prev.tasks, newTask]
        }));
    };

    const deleteTask = (taskId) => {
        const updatedTasks = projectData.tasks.filter((task) => task.id !== taskId);
        setProjectData((prev) => ({
            ...prev,
            tasks: updatedTasks
        }));

        handleSave({ project: { ...project, tasks: updatedTasks } });
    };

    const updateTaskTitle = (taskId, newTitle) => {
        const updatedTasks = projectData.tasks.map((task) =>
            task.id === taskId ? { ...task, title: newTitle } : task
        );
        setProjectData((prev) => ({
            ...prev,
            tasks: updatedTasks
        }));
    };

    const toggleTaskCompletion = (taskId) => {
        const updatedTasks = projectData.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setProjectData((prev) => ({
            ...prev,
            tasks: updatedTasks
        }));
    };

    const saveProject = () => {
        const updatedProject = {
            ...project,
            title: projectData.title,
            dueDate: projectData.dueDate,
            description: projectData.description,
            tasks: projectData.tasks
        };
        handleSave({ project: updatedProject });
    };

    const saveTask = (taskId) => {
        const updatedTasks = projectData.tasks.map((task) =>
            task.id === taskId ? { ...task, saved: true } : task
        );

        setProjectData((prev) => ({
            ...prev,
            tasks: updatedTasks
        }));

        handleSave({ project: { ...project, tasks: updatedTasks } });
    };

    return (
        <div className="h-full w-full flex justify-center items-center bg-white p-8">
            <div className="w-full max-w-2xl border border-gray-300 rounded-xl p-8 shadow-md bg-gray-50 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">Project</h2>
                <InputField
                    type="text"
                    placeholder="Title"
                    value={projectData.title}
                    onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                />

                <InputField
                    type="textarea"
                    placeholder="Description"
                    value={projectData.description}
                    onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                />

                <InputField
                    type="date"
                    value={projectData.dueDate}
                    onChange={(e) => setProjectData({ ...projectData, dueDate: e.target.value })}
                    label="Due Date"
                />

                <div className="flex justify-end space-x-2 pt-4">
                    {project?.id && (
                        <DeleteButton onClick={() => handleDelete({ id: project.id })} className='px-6 py-3'>
                            Delete Project
                        </DeleteButton>
                    )}

                    <SaveButton onClick={saveProject} className='px-6 py-3'>
                        Save Project
                    </SaveButton>
                </div>

                {project?.id && (
                    <TaskManagement
                        tasks={projectData.tasks}
                        addTask={addTask}
                        updateTaskTitle={updateTaskTitle}
                        toggleTaskCompletion={toggleTaskCompletion}
                        saveTask={saveTask}
                        deleteTask={deleteTask}
                    />
                )}
            </div>
        </div>
    );
}
