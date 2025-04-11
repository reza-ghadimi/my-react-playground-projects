import React from 'react';

function InputField({ type, placeholder, value, onChange, label }) {
  if (type === 'textarea') {
    return (
      <div className="space-y-1">
        {label && <label className="text-gray-700 font-medium">{label}</label>}
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {label && <label className="text-gray-700 font-medium">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default InputField;