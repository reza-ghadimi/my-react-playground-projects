import React from "react";

const DeleteButton = ({ onClick, className, children }) => (
    <button onClick={onClick}
        className={`bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out ${className}`}
    >
        {children ?? 'Delete'}
    </button>
);

export default DeleteButton;
