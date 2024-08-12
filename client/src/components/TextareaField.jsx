import React from 'react';
//EditProfile
const TextareaField = ({ label, value, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
      ></textarea>
    </div>
  );
};

export default TextareaField;
