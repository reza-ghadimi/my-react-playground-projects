import React from 'react';
import TaskRow from './TaskRow'; // Import TaskRow

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
                        <TaskRow
                            key={task.id}
                            task={task}
                            updateTaskTitle={updateTaskTitle}
                            toggleTaskCompletion={toggleTaskCompletion}
                            saveTask={saveTask}
                            deleteTask={deleteTask}
                        />
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
