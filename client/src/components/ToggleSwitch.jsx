import React from 'react';
//EditProfile
const ToggleSwitch = ({ label, enabled, onToggle }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <label className="text-gray-700 text-sm font-bold">{label}</label>
      <button
        onClick={onToggle}
        className={`${
          enabled ? 'bg-blue-500' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
