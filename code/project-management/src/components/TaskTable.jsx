import React from 'react';
import SaveButton from './SaveButton';
import DeleteButton from './DeleteButton';

export default function TaskTable({ tasks, updateTaskTitle, toggleTaskCompletion, saveTask, deleteTask }) {
    return (
        <table className="w-full table-auto border-collapse" >
            <thead>
                <tr>
                    <th className="px-4 py-2 text-left">Task Title</th>
                    <th className="px-4 py-2 text-left">Completed</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks?.map((task) => (
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
                            <td className="flex space-x-1">
                                <SaveButton onClick={() => saveTask(task.id)} className='px-3 py-2'>
                                    Save Task
                                </SaveButton>
                                <DeleteButton onClick={() => deleteTask(task.id)} className='px-3 py-2'>
                                    Delete Task
                                </DeleteButton>
                            </td>
                        </tr>
                    ))
                }
                {
                    tasks?.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center" >
                                No tasks added yet.
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}
