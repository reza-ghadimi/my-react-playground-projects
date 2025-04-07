import React, { useState } from "react";

export default function Project({ project, handleDelete, handleSave }) {

    console.log(project?.tasks);

    const [title, setTitle] = useState(project?.title);
    const [dueDate, setDueDate] = useState(project?.dueDate);
    const [description, setDescription] = useState(project?.description);
    const [tasks, setTasks] = useState(project?.tasks || [{ id: Date.now(), title: "", completed: false }]); // Initialize tasks array

    let currentProject = { id: project?.id, title: title, dueDate: dueDate, description: description, tasks: tasks };

    // Handle adding a new task (add an empty task row)
    const addTask = () => {
        const newTask = { id: Date.now(), title: "", completed: false }; // New task with default values
        setTasks([...tasks, newTask]);
    };

    // Handle deleting a task (based on task id)
    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));

        currentProject.tasks = tasks;
        handleSave({ project: currentProject });
    };

    // Handle task title update
    const updateTaskTitle = (taskId, newTitle) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, title: newTitle } : task
            )
        );

        currentProject.tasks = tasks;
        handleSave({ project: currentProject });
    };

    // Handle task completion toggle
    const toggleTaskCompletion = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );

        currentProject.tasks = tasks;
        handleSave({ project: currentProject });
    };

    // Save the specific task
    const saveTask = (taskId) => {
        tasks.find((task) => task.id === taskId);

        currentProject.tasks = tasks;
        handleSave({ project: currentProject });
    };

    return (
        <div className="h-full w-full flex justify-center items-center bg-white p-8">
            <div className="w-full max-w-2xl border border-gray-300 rounded-xl p-8 shadow-md bg-gray-50 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">Project</h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
                />

                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    {project?.id && (
                        <button
                            onClick={() => handleDelete({ id: project.id })}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    )}

                    <button
                        onClick={() => handleSave({ project: currentProject })}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Save
                    </button>
                </div>

                {/* Task Management Section (only shows if project has an ID) */}
                {project?.id && (
                    <div className="space-y-4 mt-6">
                        <h3 className="text-xl font-semibold text-gray-800">Tasks</h3>

                        {/* Table to display tasks */}
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Task Title</th>
                                    <th className="px-4 py-2 text-left">Completed</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Render task rows */}
                                {tasks.map((task) => (
                                    <tr key={task.id}>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                value={task.title}
                                                onChange={(e) => updateTaskTitle(task.id, e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Task Title"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => toggleTaskCompletion(task.id)}
                                                className="text-blue-500"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => saveTask(task.id)}
                                                className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => deleteTask(task.id)}
                                                className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition ml-2"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {/* Add a new empty row if there are no tasks */}
                                {tasks.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            No tasks added yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Button to Add Task */}
                        <button
                            onClick={addTask}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            Add Task
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}