// CountrySelect.js
import React from 'react';
import { Menu } from '@headlessui/react';
import { SlidersHorizontal } from 'lucide-react';

const Select = ({ options = [], value, onChange }) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="inline-flex items-center p-2 border border-gray-300 rounded-md">
        {value || 'Seleccionar país'}
        <SlidersHorizontal className="w-5 h-5 ml-2" aria-hidden="true" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 py-1 bg-white border border-gray-300 rounded-md shadow-lg">
        {options.map((option) => (
          <Menu.Item key={option.value}>
            {({ active }) => (
              <button
                onClick={() => onChange(option.value)}
                className={`block w-full px-4 py-2 text-left ${active ? 'bg-gray-100' : ''}`}
              >
                {option.label}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default Select;
