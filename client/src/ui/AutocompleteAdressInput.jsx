import { useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const AutocompleteAddressInput = ({ onSelect, placeholder, className, value }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedValue, setDebouncedValue] = useState('');

  // Debounce the input value to avoid making too many requests
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedValue.length > 2) { // Realizar la búsqueda solo si hay más de 2 caracteres
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
              q: debouncedValue,
              format: 'json',
              addressdetails: 1,
              limit: 5,
            },
          });

          setSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching address suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedValue]);

  const handleSelect = (suggestion) => {
    const address = suggestion.display_name;
    setInputValue(address);
    setSuggestions([]);

    const city = suggestion.address?.city || suggestion.address?.town || suggestion.address?.village || '';
    const country = suggestion.address?.country || '';

    onSelect({ address, city, country });
  };

  return (
    <div className="relative">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Actualiza el valor de entrada
        placeholder={placeholder}
        className={className}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-40 overflow-y-auto mt-1 rounded-md shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteAddressInput;
