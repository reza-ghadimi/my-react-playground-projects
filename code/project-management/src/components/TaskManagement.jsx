import React from "react";
import TaskTable from "./TaskTable";

const TaskManagement = ({
    tasks,
    addTask,
    updateTaskTitle,
    toggleTaskCompletion,
    saveTask,
    deleteTask
}) => {
    return (
        <div className="space-y-4 mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Tasks</h3>
            <TaskTable tasks={tasks} updateTaskTitle={updateTaskTitle} toggleTaskCompletion={toggleTaskCompletion} saveTask={saveTask} deleteTask={deleteTask} >
            </TaskTable>

            <button
                onClick={addTask}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
                Add Task
            </button>
        </div>
    );
};

export default TaskManagement;
