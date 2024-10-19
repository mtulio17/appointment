export const fetchAddressSuggestions = async (query) => {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/search?q=${query}&countrycodes=AR&format=json&addressdetails=1&limit=5`
  );
  if (!response.ok) {
    throw new Error("Error fetching address suggestions");
  }
  return await response.json();
};
