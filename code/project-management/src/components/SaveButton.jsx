import React from "react";

const SaveButton = ({ onClick, className, children }) => (
    <button
        onClick={onClick}
        className={`bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out ${className}`}
      >
        {children ?? 'Save'}
    </button>
);
export default SaveButton;
